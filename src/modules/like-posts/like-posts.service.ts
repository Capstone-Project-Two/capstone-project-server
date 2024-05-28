import { Injectable } from '@nestjs/common';
import { UpdateLikePostDto } from './dto/update-like-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LikePost } from 'src/database/schemas/like-post.schema';
import { Model } from 'mongoose';
import { CreateLikePostDto } from './dto/create-like-post.dto';

@Injectable()
export class LikePostsService {
  constructor(
    @InjectModel(LikePost.name) private likePostModel: Model<LikePost>,
  ) {}

  async create(createLikePostDto: CreateLikePostDto) {
    const res = await this.likePostModel.create(createLikePostDto);
    return res;
  }

  async findAll() {
    const res = await this.likePostModel.find().populate(['post', 'patient']);
    return res;
  }

  async findOne(id: string) {
    const res = await this.likePostModel.findOne({ post: id });
    return res;
  }

  async update(id: string, updateLikePostDto: UpdateLikePostDto) {
    const { patient } = updateLikePostDto;

    // find existing like post record by patient
    const findPost = await this.likePostModel.findOne({
      post: id,
      patient: patient,
    });
    if (findPost) {
      const res = await findPost.updateOne(
        { post: id },
        {
          like_count: findPost.like_count - 1,
        },
      );

      // remove patient like record
      await findPost.deleteOne();
      return res;
    }

    // create a new record if never like
    const res = await this.create({
      patient: patient,
      post: id,
    }).then((res) => {
      // update post like count
      res.updateOne({ post: id }, { like_count: findPost.like_count + 1 });
      return res;
    });

    return res;
  }
}
