import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  patientId: string;
}
