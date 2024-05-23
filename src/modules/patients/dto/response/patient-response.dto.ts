import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/base-response.dto';
import { GENDER } from 'src/constants/gender-constant';
import { ROLES } from 'src/constants/roles-constant';

export class PatientResponseDto extends BaseResponse {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  phone_number: string;

  @ApiProperty({ type: String, enum: GENDER })
  gender: GENDER;

  @ApiProperty({ type: Array<ROLES>, enum: ROLES })
  roles: Array<ROLES>;

  @ApiProperty({ type: Boolean, default: false })
  is_deleted: boolean;
}
