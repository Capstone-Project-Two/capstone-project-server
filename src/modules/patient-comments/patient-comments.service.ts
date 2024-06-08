import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PatientComment } from 'src/database/schemas/patient-comment.schema';
import { Model } from 'mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Post } from 'src/database/schemas/post.schema';

@Injectable()
export class PatientCommentsService {
  constructor(
    @InjectModel(PatientComment.name)
    private patientCommentModel: Model<PatientComment>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createPatientCommentDto: CreatePatientCommentDto) {
    const findPatient = await this.patientModel.findOne({
      _id: createPatientCommentDto.patient,
    });

    if (!findPatient) throw new NotFoundException('Patient not found');

    const findPost = await this.postModel.findOne({
      _id: createPatientCommentDto.post,
    });

    if (!findPost) throw new NotFoundException('Post not found');

    if (createPatientCommentDto.parent) {
      return await this.replyComment(createPatientCommentDto, findPost);
    }

    const res = await this.patientCommentModel.create(createPatientCommentDto);
    await this.increaseCommentCount(findPost);
    return res;
  }

  private async increaseCommentCount(
    findPost: import('mongoose').Document<unknown, any, Post> &
      Post & { _id: import('mongoose').Types.ObjectId },
  ) {
    await findPost.updateOne({
      comment_count: Number(findPost.comment_count) + 1,
    });
  }

  private async replyComment(
    createPatientCommentDto: CreatePatientCommentDto,
    findPost: import('mongoose').Document<unknown, any, Post> &
      Post & { _id: import('mongoose').Types.ObjectId },
  ) {
    const parentComment = await this.patientCommentModel.findOne({
      _id: createPatientCommentDto.parent,
    });

    if (!parentComment) throw new BadRequestException('No parent comment');

    const res = await this.patientCommentModel.create(createPatientCommentDto);

    await parentComment.updateOne({
      $push: {
        children: res._id,
      },
    });

    await this.increaseCommentCount(findPost);

    return res;
  }

  async findAll() {
    const res = await this.patientCommentModel
      .find()
      .populate(['patient', 'children']);
    return res;
  }

  async findOne(id: string) {
    const res = await this.patientCommentModel
      .findOne({
        _id: id,
      })
      .populate(['children', 'patient']);
    return res;
  }

  async update(id: string, updatePatientCommentDto: UpdatePatientCommentDto) {
    const findPatients = await this.patientModel.findOne({
      _id: updatePatientCommentDto.patient,
    });

    if (!findPatients) throw new NotFoundException('Patient not found');

    const res = await this.patientCommentModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          content: updatePatientCommentDto.content,
        },
      },
    );

    return {
      data: res,
      field: updatePatientCommentDto.content,
    };
  }

  async removeComment(id: string) {
    const findComment = await this.patientCommentModel.findOne({
      _id: id,
    });
    if (!findComment) throw new NotFoundException('Comment not found');

    const findPost = await this.postModel.findOne({
      _id: findComment.post,
    });

    const res = await this.patientCommentModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    await findPost.updateOne({
      comment_count: Number(findPost.comment_count) - 1,
    });

    return res;
  }

  async remove(id: string) {
    const res = await this.patientCommentModel.deleteOne({
      _id: id,
    });
    return res;
  }
}
