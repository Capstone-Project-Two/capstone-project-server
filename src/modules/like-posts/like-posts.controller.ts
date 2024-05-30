import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { LikePostsService } from './like-posts.service';
import { UpdateLikePostDto } from './dto/update-like-post.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikePostResponseDto } from './dto/response/like-post-response.dto';

@ApiTags('Like Posts')
@Controller('like-posts')
export class LikePostsController {
  constructor(private readonly likePostsService: LikePostsService) {}

  @ApiOkResponse({ type: LikePostResponseDto, isArray: true })
  @Get()
  findAll() {
    return this.likePostsService.findAll();
  }

  @ApiOkResponse({ type: LikePostResponseDto, isArray: true })
  @Get(':id')
  findLikePostByPost(@Param('id') id: string) {
    return this.likePostsService.findLikePostByPost(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLikePostDto: UpdateLikePostDto,
  ) {
    return this.likePostsService.update(id, updateLikePostDto);
  }
}
