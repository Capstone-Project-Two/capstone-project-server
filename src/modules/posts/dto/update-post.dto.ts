import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, MaxLength } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ type: Boolean, default: false })
  @IsOptional()
  is_deleted: boolean;

  @ApiProperty()
  @IsOptional()
  @MaxLength(1000)
  body?: string;
}
