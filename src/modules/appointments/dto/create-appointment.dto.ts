import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { STATUS } from 'src/constants/status-constant';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  note: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  symptoms: string;

  @ApiProperty()
  @IsString()
  patient: string;

  @ApiProperty()
  @IsString()
  therapist: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  scheduleDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: string;
}
