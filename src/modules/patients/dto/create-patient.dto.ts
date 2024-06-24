import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GENDER } from 'src/constants/gender-constant';

export class CreatePatientDto {
  @ApiProperty({ uniqueItems: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @MaxLength(64)
  @MinLength(3)
  @IsString()
  username: string;

  @ApiProperty()
  @IsPhoneNumber('KH')
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsEnum(GENDER)
  gender: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  credits: number;
}
