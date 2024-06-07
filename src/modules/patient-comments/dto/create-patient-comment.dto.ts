import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePatientCommentDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty()
  @IsString()
  patient: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  parent?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  children?: Array<string>;
}
