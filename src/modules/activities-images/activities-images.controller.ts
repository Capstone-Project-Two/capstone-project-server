import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivitiesImagesService } from './activities-images.service';
import { CreateActivitiesImageDto } from './dto/create-activities-image.dto';
import { UpdateActivitiesImageDto } from './dto/update-activities-image.dto';

@Controller('activities-images')
export class ActivitiesImagesController {
  constructor(private readonly activitiesImagesService: ActivitiesImagesService) {}

  @Post()
  create(@Body() createActivitiesImageDto: CreateActivitiesImageDto) {
    return this.activitiesImagesService.create(createActivitiesImageDto);
  }

  @Get()
  findAll() {
    return this.activitiesImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivitiesImageDto: UpdateActivitiesImageDto) {
    return this.activitiesImagesService.update(+id, updateActivitiesImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesImagesService.remove(+id);
  }
}
