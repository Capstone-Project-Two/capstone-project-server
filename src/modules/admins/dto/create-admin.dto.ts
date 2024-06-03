import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { ROLES } from 'src/constants/roles-constant';

export class CreateAdminDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  // @ApiProperty()
  // @IsString()
  // @IsEmpty()
  // phone_number: string;

  // @ApiProperty({ enum: ROLES })
  // @IsEnum(ROLES)
  // roles: Array<string>;
}
