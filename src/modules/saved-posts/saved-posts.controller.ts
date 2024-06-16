import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SavedPostsService } from './saved-posts.service';
import { CreateSavedPostDto } from './dto/create-saved-post.dto';
import { UpdateSavedPostDto } from './dto/update-saved-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Saved posts')
@Controller('saved-posts')
export class SavedPostsController {
  constructor(private readonly savedPostsService: SavedPostsService) {}

  @Post()
  create(@Body() createSavedPostDto: CreateSavedPostDto) {
    return this.savedPostsService.create(createSavedPostDto);
  }

  @Get()
  findAll() {
    return this.savedPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savedPostsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSavedPostDto: UpdateSavedPostDto,
  ) {
    return this.savedPostsService.update(+id, updateSavedPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.savedPostsService.remove(+id);
  }
}
