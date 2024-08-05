import { Injectable } from '@nestjs/common';
import { CreateMindCheckupDto } from './dto/create-mind-checkup.dto';
import { UpdateMindCheckupDto } from './dto/update-mind-checkup.dto';

@Injectable()
export class MindCheckupService {
  create(createMindCheckupDto: CreateMindCheckupDto) {
    return 'This action adds a new mindCheckup';
  }

  findAll() {
    return `This action returns all mindCheckup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mindCheckup`;
  }

  update(id: number, updateMindCheckupDto: UpdateMindCheckupDto) {
    return `This action updates a #${id} mindCheckup`;
  }

  remove(id: number) {
    return `This action removes a #${id} mindCheckup`;
  }
}
