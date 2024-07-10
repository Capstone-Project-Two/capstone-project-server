import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateActivityDto {

    @ApiProperty()
    @IsString()
    task: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description?: string;

    @ApiProperty()
    @IsString()
    location: string
  
    @ApiProperty({ type: String, isArray: true })
    @IsOptional()
    activityImages?: string;
}
