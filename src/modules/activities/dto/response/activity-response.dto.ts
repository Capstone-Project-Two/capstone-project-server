import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { BaseResponse } from "src/common/base-response.dto";

export class ActivityResponseDto extends BaseResponse {

    @ApiProperty({type: String})
    task: string

    @ApiProperty({type: String})
    description?: string;

    @ApiProperty({type: String})
    location: string
  
    @ApiProperty({ type: String, isArray: true })
    activityImages?: string;
}
