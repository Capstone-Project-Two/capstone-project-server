import { Injectable } from '@nestjs/common';
import { UpdateLikePostDto } from './dto/update-like-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LikePost } from 'src/database/schemas/like-post.schema';
import { Model } from 'mongoose';
import { CreateLikePostDto } from './dto/create-like-post.dto';
import { Post } from 'src/database/schemas/post.schema';
import { PaginationParamDto } from 'src/common/dto/pagination-param.dto';

@Injectable()
export class LikePostsService {
  constructor(
    @InjectModel(LikePost.name) private likePostModel: Model<LikePost>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(createLikePostDto: CreateLikePostDto) {
    const res = await this.likePostModel.create(createLikePostDto);
    return res;
  }

  async findAll(pagination: PaginationParamDto) {
    const { limit = 10, page = 1 } = pagination;
    const skip = limit * page - limit;

    const res = await this.likePostModel
      .find()
      .populate(['patient'])
      .skip(skip)
      .limit(limit);

    return res;
  }

  async findLikePostByPost(id: string) {
    const res = await this.likePostModel
      .find({ post: id, is_like: true })
      .populate(['patient']);

    if (!res) return [];

    return res;
  }

  async findLikePostByPatient(id: string) {
    const res = await this.likePostModel
      .find({ patient: id, is_like: true })
      .populate(['post']);

    if (!res) return [];

    return res;
  }

  async update(id: string, updateLikePostDto: UpdateLikePostDto) {
    // find like post record
    const findPost = await this.likePostModel.findOne({
      patient: updateLikePostDto.patient,
      post: id,
    });

    // get original post
    const post = await this.postModel.findOne({
      _id: id,
    });

    // if not exist
    if (!findPost) {
      const res = await this.likePostModel.create({
        patient: updateLikePostDto.patient,
        post: id,
      });

      // update like count of post
      await this.postModel.findOneAndUpdate(
        { _id: id },
        { like_count: Number(post.like_count) + 1 },
      );

      return {
        message: 'Like',
        data: res,
      };
    }

    // if exist and is like
    if (findPost.is_like) {
      const res = await findPost.updateOne({
        is_like: false,
      });
      // update like count of original post
      await this.postModel.findOneAndUpdate(
        { _id: id },
        { like_count: Number(post.like_count) - 1 },
      );

      return {
        message: 'Unlike',
        data: res,
      };
    }

    const res = await findPost.updateOne({
      is_like: true,
    });
    // update like count of original post
    await this.postModel.findOneAndUpdate(
      { _id: id },
      { like_count: Number(post.like_count) + 1 },
    );

    return {
      message: 'Like',
      data: res,
    };
  }
}
