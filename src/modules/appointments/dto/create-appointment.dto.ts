import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { STATUS } from 'src/constants/status-constant';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  patient: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  therapist: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  datetime: Date;

  @ApiProperty()
  @IsOptional()
  @IsEnum(STATUS)
  status: string
}
