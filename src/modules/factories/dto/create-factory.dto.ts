import { ApiProperty } from '@nestjs/swagger';

export class CreateFactoryDto {
  @ApiProperty({ default: 10 })
  length: number;
}
