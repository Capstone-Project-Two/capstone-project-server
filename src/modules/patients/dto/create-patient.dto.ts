import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({ uniqueItems: true })
  @IsEmail()
  email: string;
}
