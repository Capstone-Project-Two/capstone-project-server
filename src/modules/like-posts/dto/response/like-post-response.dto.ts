import { ApiProperty } from '@nestjs/swagger';
import { PatientResponseDto } from 'src/modules/patients/dto/response/patient-response.dto';
import { PostResponseDto } from 'src/modules/posts/response/post-response.dto';

export class LikePostResponseDto {
  @ApiProperty({ type: PatientResponseDto })
  patient: PatientResponseDto;

  @ApiProperty({ type: PostResponseDto })
  post: PostResponseDto;

  @ApiProperty({ type: Number })
  like_count: number;
}
