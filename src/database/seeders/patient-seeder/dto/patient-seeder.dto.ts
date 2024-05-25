import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PatientSeederDto {
  @ApiProperty({ required: false, default: 100 })
  @IsOptional()
  @IsNumber()
  lenght?: number;
}
