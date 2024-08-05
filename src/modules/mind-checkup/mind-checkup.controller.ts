import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MindCheckupService } from './mind-checkup.service';
import { CreateMindCheckupDto } from './dto/create-mind-checkup.dto';
import { UpdateMindCheckupDto } from './dto/update-mind-checkup.dto';

@Controller('mind-checkup')
export class MindCheckupController {
  constructor(private readonly mindCheckupService: MindCheckupService) {}

  @Post()
  create(@Body() createMindCheckupDto: CreateMindCheckupDto) {
    return this.mindCheckupService.create(createMindCheckupDto);
  }

  @Get()
  findAll() {
    return this.mindCheckupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mindCheckupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMindCheckupDto: UpdateMindCheckupDto) {
    return this.mindCheckupService.update(+id, updateMindCheckupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mindCheckupService.remove(+id);
  }
}
