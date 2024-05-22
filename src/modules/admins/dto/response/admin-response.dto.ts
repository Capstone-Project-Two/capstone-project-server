import { ApiProperty } from '@nestjs/swagger';
import { ROLES } from 'src/constants/roles-constant';

export class AdminResponseDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  phone_number: string;

  @ApiProperty({ type: Array<ROLES>, enum: ROLES })
  roles: Array<ROLES>;
}
