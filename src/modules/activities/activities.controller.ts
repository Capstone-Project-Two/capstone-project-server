import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AcitvitiesImagesPath, MAX_FILE_COUNT } from 'src/constants/multer-file-constant';
import { multerOptions } from 'src/config/files/multer-file-options';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor(
      'activityImages',
      MAX_FILE_COUNT,
      multerOptions(AcitvitiesImagesPath),
    ),
  )
  create(
    @Body() createPostDto: CreateActivityDto,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    console.log("Controller")
    return this.activitiesService.create(createPostDto, files);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activitiesService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}