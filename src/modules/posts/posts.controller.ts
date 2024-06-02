import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostResponseDto } from './response/post-response.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/files/multer-file-options';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('postPhotos', 10, multerOptions))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    return this.postsService.create(createPostDto, files);
  }

  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  @Get()
  @ApiQuery({ name: 'page', type: Number, example: 1, required: false })
  @ApiQuery({ name: 'limit', type: Number, example: 10, required: false })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.postsService.findAll({ page, limit });
  }

  @ApiOkResponse({ type: PostResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiHeader({ name: 'patient_id', required: true })
  @Patch('/remove-post/:id')
  userRemovePost(@Req() request: Request, @Param('id') id: string) {
    const patient_id = request.headers['patient_id'];
    return this.postsService.userRemovePost(id, { patient_id });
  }

  @ApiHeader({ name: 'patient_id', required: true })
  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: string) {
    const patient_id = request.headers['patient_id'];
    return this.postsService.remove(id, { patient_id });
  }
}
