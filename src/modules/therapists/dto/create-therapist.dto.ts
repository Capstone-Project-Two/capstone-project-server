import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { GENDER } from 'src/constants/gender-constant';
import { ROLES } from 'src/constants/roles-constant';

export class CreateTherapistDto {
  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ uniqueItems: true })
  @IsString()
  username: string;

  @ApiProperty({ uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty({ uniqueItems: true })
  @IsString()
  phone_number: string;

  @ApiProperty({ enum: GENDER })
  @IsEnum(GENDER)
  gender: Array<GENDER>;

  @ApiProperty({ enum: ROLES, default: [ROLES.THERAPIST] })
  @IsEnum(ROLES)
  @IsOptional()
  roles?: Array<ROLES>;

  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}
