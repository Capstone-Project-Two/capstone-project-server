import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { PatientResponseDto } from 'src/modules/patients/dto/response/patient-response.dto';

export class PatientCommentResponseDto extends BaseResponse {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: PatientCommentResponseDto })
  parent: PatientCommentResponseDto;

  @ApiProperty({ type: PatientResponseDto })
  patient: PatientResponseDto;

  @ApiProperty({ type: Number, default: 0 })
  reply_count: number;

  @ApiProperty({ type: Boolean, default: false })
  is_deleted: boolean;
}
