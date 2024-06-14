import { PartialType } from '@nestjs/swagger';
import { CreateActivitiesImageDto } from './create-activities-image.dto';

export class UpdateActivitiesImageDto extends PartialType(CreateActivitiesImageDto) {}
