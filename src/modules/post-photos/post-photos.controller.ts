import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostPhotosService } from './post-photos.service';
import { CreatePostPhotoDto } from './dto/create-post-photo.dto';
import { UpdatePostPhotoDto } from './dto/update-post-photo.dto';

@Controller('post-photos')
export class PostPhotosController {
  constructor(private readonly postPhotosService: PostPhotosService) {}

  @Post()
  create(@Body() createPostPhotoDto: CreatePostPhotoDto) {
    return this.postPhotosService.create(createPostPhotoDto);
  }

  @Get()
  findAll() {
    return this.postPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostPhotoDto: UpdatePostPhotoDto) {
    return this.postPhotosService.update(+id, updatePostPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postPhotosService.remove(+id);
  }
}
