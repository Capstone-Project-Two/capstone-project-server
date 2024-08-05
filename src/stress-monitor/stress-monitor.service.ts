import { Injectable } from '@nestjs/common';
import { CreateStressMonitorDto } from './dto/create-stress-monitor.dto';
import { UpdateStressMonitorDto } from './dto/update-stress-monitor.dto';

@Injectable()
export class StressMonitorService {
  create(createStressMonitorDto: CreateStressMonitorDto) {
    return 'This action adds a new stressMonitor';
  }

  findAll() {
    return `This action returns all stressMonitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stressMonitor`;
  }

  update(id: number, updateStressMonitorDto: UpdateStressMonitorDto) {
    return `This action updates a #${id} stressMonitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} stressMonitor`;
  }
}
