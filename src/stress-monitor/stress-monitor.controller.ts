import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StressMonitorService } from './stress-monitor.service';
import { CreateStressMonitorDto } from './dto/create-stress-monitor.dto';
import { UpdateStressMonitorDto } from './dto/update-stress-monitor.dto';

@Controller('stress-monitor')
export class StressMonitorController {
  constructor(private readonly stressMonitorService: StressMonitorService) {}

  @Post()
  create(@Body() createStressMonitorDto: CreateStressMonitorDto) {
    return this.stressMonitorService.create(createStressMonitorDto);
  }

  @Get()
  findAll() {
    return this.stressMonitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stressMonitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStressMonitorDto: UpdateStressMonitorDto) {
    return this.stressMonitorService.update(+id, updateStressMonitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stressMonitorService.remove(+id);
  }
}
