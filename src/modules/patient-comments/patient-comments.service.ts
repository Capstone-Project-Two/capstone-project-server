import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PatientComment } from 'src/database/schemas/patient-comment.schema';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Post } from 'src/database/schemas/post.schema';
import { ToObjectId } from 'src/utils/mongo-helper';
import { PatientCommentResponseDto } from './dto/response/patient-comment-response.dto';
import { MongoCollection } from 'src/constants/mongo-collection-constant';

@Injectable()
export class PatientCommentsService {
  constructor(
    @InjectModel(PatientComment.name)
    private patientCommentModel: Model<PatientComment>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  private async updatePostCommentCount(postId: any) {
    const findPost = await this.postModel.findOne({ _id: postId });
    const commentCount = await this.patientCommentModel.countDocuments();

    await findPost.updateOne({
      comment_count: commentCount,
    });

    return findPost;
  }

  private async replyComment(
    createPatientCommentDto: CreatePatientCommentDto,
    findPost: import('mongoose').Document<unknown, any, Post> &
      Post & { _id: import('mongoose').Types.ObjectId },
  ) {
    const parentComment = await this.findOne(createPatientCommentDto.parent);

    if (!parentComment) throw new BadRequestException('No parent comment');

    const res = await this.patientCommentModel.create(createPatientCommentDto);

    await parentComment.updateOne({
      $push: {
        children: res._id,
      },
    });

    await this.updatePostCommentCount(findPost._id);

    return res;
  }

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
    await this.updatePostCommentCount(findPost._id);
    return res;
  }

  async findAll() {
    const res = await this.patientCommentModel
      .find()
      .where({
        is_deleted: false,
      })
      .populate(['patient'])
      .populate({
        path: 'children',
        match: {
          is_deleted: false,
        },
      });

    return res;
  }

  async findOne(id: string) {
    const res = await this.patientCommentModel
      .findOne({
        _id: id,
      })
      .where({
        is_deleted: false,
      })
      .populate(['patient'])
      .populate({
        path: 'children',
        match: {
          is_deleted: false,
        },
      });
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

  private async removeMultiComments(
    findComment: import('mongoose').Document<unknown, any, PatientComment> &
      PatientComment & { _id: import('mongoose').Types.ObjectId },
    findPost: import('mongoose').Document<unknown, any, Post> &
      Post & { _id: import('mongoose').Types.ObjectId },
  ) {
    const res = await this.patientCommentModel.updateMany(
      {
        $or: [{ parent: findComment._id }, { _id: findComment._id }],
      },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    // update post comment count
    await this.updatePostCommentCount(findPost._id);
    return res;
  }

  private async removeOneComment(id: string) {
    const res = await this.patientCommentModel.updateOne(
      { _id: id },
      {
        $set: {
          is_deleted: true,
        },
      },
    );
    return res;
  }

  async removeComment(id: string) {
    const findComment = await this.findOne(id);
    if (!findComment) throw new NotFoundException('Comment not found');

    const findPost = await this.postModel.findOne({
      _id: findComment.post,
    });

    if (!findPost) throw new NotFoundException('Post Not found');

    // if the comment has children
    if (findComment.children.length > 0) {
      const res = await this.removeMultiComments(findComment, findPost);
      return res;
    }

    // If no parent
    const res = await this.removeOneComment(id);

    // update post comment count
    await findPost.updateOne({
      comment_count: Number(findPost.comment_count) - 1,
    });

    return res;
  }

  async findAllReplies(commentId: string) {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: ToObjectId(commentId),
        },
      },
      {
        $graphLookup: {
          from: MongoCollection.PatientComments,
          startWith: ToObjectId(commentId),
          connectFromField: '_id',
          connectToField: 'parent',
          as: 'children',
        },
      },
    ];
    const res = await this.patientCommentModel.aggregate(pipeline);
    return res;
  }

  async remove(id: string) {
    const findComment = await this.patientCommentModel.findOne({ _id: id });
    if (!findComment) throw new NotFoundException();

    const allReplies = await this.findAllReplies(id);

    const replies = [allReplies[0]._id];
    allReplies[0].children.forEach((reply: PatientCommentResponseDto) => {
      replies.push(reply._id);
    });

    const res = await this.patientCommentModel.deleteMany({
      _id: {
        $in: replies,
      },
    });

    await this.updatePostCommentCount(findComment.post);

    return res;
  }
}
