import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: string;
}
