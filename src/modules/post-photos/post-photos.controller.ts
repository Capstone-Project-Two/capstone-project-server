import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostPhotosService } from './post-photos.service';
import { UpdatePostPhotoDto } from './dto/update-post-photo.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { PostResponseDto } from '../posts/response/post-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MAX_FILE_COUNT } from 'src/constants/multer-file-constant';
import { multerOptions } from 'src/config/files/multer-file-options';

@Controller('post-photos')
export class PostPhotosController {
  constructor(private readonly postPhotosService: PostPhotosService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('postPhotos', MAX_FILE_COUNT, multerOptions),
  )
  create(
    @Body() id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postPhotosService.create(id, files);
  }

  @ApiOkResponse({ type: PostResponseDto })
  @Get()
  findAll() {
    return this.postPhotosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postPhotosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostPhotoDto: UpdatePostPhotoDto,
  ) {
    return this.postPhotosService.update(+id, updatePostPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postPhotosService.remove(+id);
  }
}
