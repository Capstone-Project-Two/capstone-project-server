import { Injectable } from '@nestjs/common';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { UpdatePostPhotoDto } from './dto/update-post-photo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PostPhoto } from 'src/database/schemas/post-photo-schema';
import { Model } from 'mongoose';

@Injectable()
export class PostPhotosService {
  constructor(
    @InjectModel(PostPhoto.name) private postPhoto: Model<PostPhoto>,
  ) {}

  create(createPostPhotoDto: CreatePostPhotoDto) {
    return 'This action adds a new postPhoto';
  }

  async findAll() {
    const res = await this.postPhoto.find().populate(['post']);
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} postPhoto`;
  }

  update(id: number, updatePostPhotoDto: UpdatePostPhotoDto) {
    return `This action updates a #${id} postPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} postPhoto`;
  }
}
