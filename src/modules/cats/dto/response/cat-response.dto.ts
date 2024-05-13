import { ApiProperty } from '@nestjs/swagger';

export class CatResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
