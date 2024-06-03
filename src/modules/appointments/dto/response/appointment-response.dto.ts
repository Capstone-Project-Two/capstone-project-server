import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { ROLES } from 'src/constants/roles-constant';
import { STATUS } from 'src/constants/status-constant';
import { PatientResponseDto } from 'src/modules/patients/dto/response/patient-response.dto';
import { TherapistResponseDto } from 'src/modules/therapists/dto/response/therapist-response.dto';

export class AppointmentResponseDto extends BaseResponse {
  @ApiProperty({ type: Date })
  datetime: Date;

  @ApiProperty({ type: STATUS, enum: STATUS })
  status: string;

  @ApiProperty({ type: PatientResponseDto })
  patient: string;

  @ApiProperty({ type: TherapistResponseDto })
  therapist: string;
}
