import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(1000)
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patient: string;
}
