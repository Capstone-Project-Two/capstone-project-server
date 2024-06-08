import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePatientCommentDto } from './create-patient-comment.dto';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdatePatientCommentDto extends PartialType(
  CreatePatientCommentDto,
) {
  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  @IsOptional()
  is_deleted?: boolean;

  @ApiProperty({ type: Number, default: false })
  @IsNumber()
  @IsOptional()
  reply_count?: number;
}
