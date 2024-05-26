import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseDto } from './response/post-response.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOkResponse({ type: PostResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.postsService.findAll();
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
