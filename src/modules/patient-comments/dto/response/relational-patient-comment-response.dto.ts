import { ApiProperty } from '@nestjs/swagger';
import { PatientCommentResponseDto } from './patient-comment-response.dto';

export class RelationalPatientCommentResponseDto extends PatientCommentResponseDto {
  @ApiProperty({ type: PatientCommentResponseDto, isArray: true })
  children: Array<PatientCommentResponseDto>;
}
