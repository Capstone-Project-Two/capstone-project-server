import { Injectable } from '@nestjs/common';
import { UpdateLikePostDto } from './dto/update-like-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LikePost } from 'src/database/schemas/like-post.schema';
import { Model } from 'mongoose';
import { CreateLikePostDto } from './dto/create-like-post.dto';
import { Post } from 'src/database/schemas/post.schema';

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

  async findAll() {
    try {
      const res = await this.likePostModel.find().populate(['post', 'patient']);
      return res;
    } catch (e) {
      return e;
    }
  }

  async findLikePostByPost(id: string) {
    try {
      const res = await this.likePostModel
        .find({ post: id })
        .populate(['post', 'patient']);

      if (!res) return [];

      return res;
    } catch (e) {
      return e;
    }
  }

  async update(id: string, updateLikePostDto: UpdateLikePostDto) {
    try {
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
          {
            _id: id,
          },
          {
            like_count: Number(post.like_count) + 1,
          },
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
          {
            _id: id,
          },
          {
            like_count: Number(post.like_count) - 1,
          },
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
        {
          _id: id,
        },
        {
          like_count: Number(post.like_count) + 1,
        },
      );

      return {
        message: 'Like',
        data: res,
      };
    } catch (e) {
      return e;
    }
  }
}
