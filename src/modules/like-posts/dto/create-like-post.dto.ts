import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLikePostDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  patient: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  post: string;
}
