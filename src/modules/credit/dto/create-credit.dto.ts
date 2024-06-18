import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCreditDto {
  @ApiProperty()
  @IsString()
  title: string;
}
