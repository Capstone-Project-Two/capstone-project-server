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

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      if (!isValidObjectId(createPostDto.patient)) {
        throw new BadRequestException('Invalid Patient Id');
      }
      const findUser = await this.patientModel.findById(createPostDto.patient);

      if (!findUser) {
        throw new NotFoundException('Patient does not exist');
      }

      const res = await this.postModel.create(createPostDto);

      await findUser.updateOne({
        $push: {
          posts: res._id,
        },
      });

      return res;
    } catch (e) {
      return e;
    }
  }

  async findAll(pagination: PaginationParamDto) {
    const { page = 1, limit = 10 } = pagination;
    try {
      const skip = page * limit - limit;
      const res = await this.postModel
        .find()
        .limit(limit)
        .skip(skip)
        .populate(['patient'])
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
    } catch (e) {
      return e;
    }
  }

  async findOne(id: string) {
    try {
      const res = await this.postModel
        .findOne({
          _id: id,
        })
        .populate(['patient']);
      return res;
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
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
    } catch (e) {
      return e;
    }
  }

  async userRemovePost(id: string, body: { patient_id: string }) {
    try {
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
    } catch (e) {
      return e;
    }
  }

  async remove(id: string, body: { patient_id: string }) {
    const { patient_id } = body;

    try {
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
    } catch (e) {
      return e;
    }
  }
}
