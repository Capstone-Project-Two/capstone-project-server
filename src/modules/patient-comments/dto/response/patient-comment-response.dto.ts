import { ApiProperty } from '@nestjs/swagger';
import { RelationalPatientResponseDto } from 'src/modules/patients/dto/response/relational-patient-response.dto';

export class PatientCommentResponse {
  @ApiProperty()
  content: string;

  @ApiProperty({ type: RelationalPatientResponseDto })
  patient: RelationalPatientResponseDto;

  @ApiProperty({ type: PatientCommentResponse })
  parent: PatientCommentResponse;

  @ApiProperty({ type: PatientCommentResponse, isArray: true })
  children: Array<PatientCommentResponse>;
}
