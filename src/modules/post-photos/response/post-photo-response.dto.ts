import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/database/schemas/post.schema';

export class PostPhotoResponseDto {
  @ApiProperty()
  filename: string;

  @ApiProperty({ type: Post })
  post: Post;
}
