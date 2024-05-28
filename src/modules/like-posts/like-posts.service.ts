import { Injectable } from '@nestjs/common';
import { CreateLikePostDto } from './dto/create-like-post.dto';
import { UpdateLikePostDto } from './dto/update-like-post.dto';

@Injectable()
export class LikePostsService {
  create(createLikePostDto: CreateLikePostDto) {
    return 'This action adds a new likePost';
  }

  findAll() {
    return `This action returns all likePosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likePost`;
  }

  update(id: number, updateLikePostDto: UpdateLikePostDto) {
    return `This action updates a #${id} likePost`;
  }

  remove(id: number) {
    return `This action removes a #${id} likePost`;
  }
}
