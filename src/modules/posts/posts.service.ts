import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/schemas/post.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Patient } from 'src/schemas/patient.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      if (!isValidObjectId(createPostDto.patientId)) {
        throw new BadRequestException('Invalid Patient Id');
      }
      const findUser = await this.patientModel.findById(
        createPostDto.patientId,
      );

      if (!findUser) {
        throw new NotFoundException('Patient does not exist');
      }

      const newPost = new this.postModel({
        patient: createPostDto.patientId,
        ...createPostDto,
      });
      const res = await newPost.save();

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

  async findAll() {
    const res = await this.postModel.find().populate(['patient']).exec();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
