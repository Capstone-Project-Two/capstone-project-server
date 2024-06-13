import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/database/schemas/post.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { getPaginateMeta } from 'src/common/paginate';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';
import { PostPhoto } from 'src/database/schemas/post-photo-schema';
import { PostPhotosService } from '../post-photos/post-photos.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(PostPhoto.name) private postPhoto: Model<PostPhoto>,
    private postPhotosService: PostPhotosService,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    files: Array<Express.Multer.File>,
  ) {
    const isNoFiles = !files || files?.length === 0;
    const isEmpty = createPostDto.body?.trim().length === 0 && isNoFiles;
    if (isEmpty) throw new BadRequestException();
    if (!isValidObjectId(createPostDto.patient)) {
      throw new BadRequestException('Invalid Patient Id');
    }
    const findUser = await this.patientModel.findById(createPostDto.patient);

    if (!findUser) {
      throw new NotFoundException('Patient does not exist');
    }

    if (isNoFiles) delete createPostDto.postPhotos;
    const postPhotos = [];

    const createPostRes = await this.postModel.create(createPostDto);

    if (!isNoFiles) {
      const postPhotosRes = await this.postPhotosService.create(
        createPostRes._id,
        files,
      );

      postPhotosRes.forEach((postPhoto) => {
        const { _id } = postPhoto;
        postPhotos.push(_id);
      });

      await createPostRes.updateOne({
        $push: {
          postPhotos: [...postPhotos],
        },
      });
    }
    await findUser.updateOne({
      $push: {
        posts: createPostRes._id,
      },
    });

    return createPostRes;
  }

  async findAll(pagination: PaginationParamDto) {
    const { page = 1, limit = 10 } = pagination;
    const skip = page * limit - limit;
    const res = await this.postModel
      .find()
      .limit(limit)
      .skip(skip)
      .sort({
        createdAt: 'desc',
      })
      .populate(['patient', 'postPhotos'])
      .exec();

    return {
      data: res,
      meta: await getPaginateMeta({
        model: this.postModel,
        resLength: res.length,
        limit,
        page,
      }),
    };
  }

  async findOne(id: string) {
    const res = await this.postModel
      .findOne({
        _id: id,
      })
      .populate(['patient', 'postPhotos']);

    if (!res) throw new NotFoundException();

    return res;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const res = await this.postModel.updateOne(
      { _id: id },
      { ...updatePostDto },
    );
    return {
      data: {
        res,
        field: updatePostDto,
      },
    };
  }

  async userRemovePost(id: string, body: { patient_id: string }) {
    const { patient_id } = body;
    const findPatient = await this.patientModel.findById(patient_id);
    const findPost = await this.postModel.findById(id);

    if (!findPatient) {
      throw new UnauthorizedException();
    }

    if (findPatient._id.toString() !== findPost.patient.toString()) {
      throw new UnauthorizedException('Not the owner of post');
    }

    const res = await this.postModel.updateOne(
      { _id: id },
      { is_deleted: true },
    );

    return res;
  }

  async remove(id: string, body: { patient_id: string }) {
    const { patient_id } = body;

    const findPost = await this.postModel.findById(id);
    const findPatient = await this.patientModel.findById(patient_id);
    if (!findPost) {
      throw new NotFoundException('Post does not exist');
    }

    if (findPost.patient.toString() !== findPatient._id.toString()) {
      throw new UnauthorizedException('Not the owner of post');
    }

    const res = await findPost.deleteOne({ _id: id });
    return res;
  }
}
