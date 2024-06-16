import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PatientComment } from 'src/database/schemas/patient-comment.schema';
import { CreatePatientCommentDto } from './dto/create-patient-comment.dto';
import { UpdatePatientCommentDto } from './dto/update-patient-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from 'src/database/schemas/patient.schema';
import { Post } from 'src/database/schemas/post.schema';
import { ToObjectId } from 'src/utils/mongo-helper';
import { PatientCommentResponseDto } from './dto/response/patient-comment-response.dto';
import { CommentPipeline } from './comment.pipeline';

@Injectable()
export class PatientCommentsService {
  constructor(
    @InjectModel(PatientComment.name)
    private patientCommentModel: Model<PatientComment>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    private commentPipeline: CommentPipeline,
  ) {}

  private async updatePostCommentCount(postId: any) {
    const findPost = await this.postModel.findOne({ _id: postId });
    const commentCount = await this.patientCommentModel
      .where({
        is_deleted: false,
      })
      .countDocuments();

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
    const parentComment = await this.patientCommentModel.findOne({
      _id: createPatientCommentDto.parent,
      is_deleted: false,
    });

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
      is_banned: false,
      is_deleted: false,
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
    const res = this.patientCommentModel.aggregate(
      this.commentPipeline.commentResponsePipeline({}),
    );

    return res;
  }

  async findCommentByPost(postId: string) {
    const res = await this.patientCommentModel.aggregate(
      this.commentPipeline.commentResponsePipeline({
        postId: ToObjectId(postId),
      }),
    );

    return res;
  }

  async findOne(id: string) {
    const res = await this.patientCommentModel.aggregate(
      this.commentPipeline.commentResponsePipeline({
        commentId: ToObjectId(id),
      }),
    );
    if (res.length === 0) throw new NotFoundException();
    return res[0];
  }

  async update(id: string, updatePatientCommentDto: UpdatePatientCommentDto) {
    const findPatients = await this.patientModel.findOne({
      _id: updatePatientCommentDto.patient,
      is_banned: false,
      is_deleted: false,
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
      is_deleted: false,
    });
    if (!findComment) throw new NotFoundException();

    const findPost = await this.postModel.findOne({
      _id: findComment.post,
    });

    if (!findPost) throw new NotFoundException('Post Not found');

    const allReplies = await this.findAllReplies(id);
    const replyIds = [allReplies[0]._id];

    allReplies[0]?.replies.forEach((reply: PatientCommentResponseDto) => {
      replyIds.push(reply._id);
    });

    const res = await this.patientCommentModel.updateMany(
      {
        _id: {
          $in: replyIds,
        },
      },
      {
        $set: {
          is_deleted: true,
        },
      },
    );

    // find parent comment and pop deleted comment
    await this.patientCommentModel.findOneAndUpdate(
      {
        _id: findComment.parent,
        is_deleted: false,
      },
      {
        $pull: {
          children: {
            $in: replyIds,
          },
        },
      },
    );

    await this.updatePostCommentCount(findPost._id);

    return res;
  }

  async findAllReplies(commentId: string) {
    const res = await this.patientCommentModel.aggregate([
      ...this.commentPipeline.repliesResponsePipeline({
        commentId: ToObjectId(commentId), 
      }),
      {
        $project: {
          replies: 1,
          reply_count: 1,
        },
      },
      {
        $unwind: '$replies',
      },
      {
        $sort: {
          'replies.createdAt': 1,
        },
      },
      {
        $group: {
          _id: '$_id',
          replies: {
            $push: '$replies',
          },
        },
      },
    ]);
    return res;
  }

  async remove(id: string) {
    const findComment = await this.patientCommentModel.findOne({ _id: id });
    if (!findComment) throw new NotFoundException();

    const allReplies = await this.findAllReplies(id);

    const replies = [allReplies[0]._id];
    allReplies[0].replies.forEach((reply: PatientCommentResponseDto) => {
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
