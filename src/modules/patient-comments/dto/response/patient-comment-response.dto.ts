import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { RelationalPatientResponseDto } from 'src/modules/patients/dto/response/relational-patient-response.dto';

export class PatientCommentResponse extends BaseResponse {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: RelationalPatientResponseDto })
  patient: RelationalPatientResponseDto;

  @ApiProperty({ type: PatientCommentResponse })
  parent: PatientCommentResponse;

  @ApiProperty({ type: PatientCommentResponse, isArray: true })
  children: Array<PatientCommentResponse>;

  @ApiProperty({ type: Number, default: 0 })
  reply_count: number;

  @ApiProperty({ type: Boolean, default: false })
  is_deleted: boolean;
}
