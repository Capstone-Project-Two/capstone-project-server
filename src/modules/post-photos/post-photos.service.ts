import { Injectable } from '@nestjs/common';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { UpdatePostPhotoDto } from './dto/update-post-photo.dto';

@Injectable()
export class PostPhotosService {
  create(createPostPhotoDto: CreatePostPhotoDto) {
    return 'This action adds a new postPhoto';
  }

  findAll() {
    return `This action returns all postPhotos`;
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
