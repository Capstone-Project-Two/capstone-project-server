import { Module } from '@nestjs/common';
import { StressMonitorService } from './stress-monitor.service';
import { StressMonitorController } from './stress-monitor.controller';

@Module({
  controllers: [StressMonitorController],
  providers: [StressMonitorService],
})
export class StressMonitorModule {}
