import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { PatientResponseDto } from 'src/modules/patients/dto/response/patient-response.dto';
import { PostResponseDto } from 'src/modules/posts/response/post-response.dto';

export class LikePostResponseDto extends BaseResponse {
  @ApiProperty({ type: PatientResponseDto })
  patient: PatientResponseDto;

  @ApiProperty({ type: PostResponseDto })
  post: PostResponseDto;

  @ApiProperty({ type: Boolean })
  is_like: boolean;
}
