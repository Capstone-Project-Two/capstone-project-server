import { Injectable } from '@nestjs/common';
import { CreateActivitiesImageDto } from './dto/create-activities-image.dto';
import { UpdateActivitiesImageDto } from './dto/update-activities-image.dto';

@Injectable()
export class ActivitiesImagesService {
  create(createActivitiesImageDto: CreateActivitiesImageDto) {
    return 'This action adds a new activitiesImage';
  }

  findAll() {
    return `This action returns all activitiesImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activitiesImage`;
  }

  update(id: number, updateActivitiesImageDto: UpdateActivitiesImageDto) {
    return `This action updates a #${id} activitiesImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} activitiesImage`;
  }
}
