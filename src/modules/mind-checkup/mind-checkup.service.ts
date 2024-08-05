import { Injectable } from '@nestjs/common';
import { CreateMindCheckupDto } from './dto/create-mind-checkup.dto';
import { UpdateMindCheckupDto } from './dto/update-mind-checkup.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ML_BASE_URL } from 'src/constants/env-constants';
import { firstValueFrom } from 'rxjs';
import { ML_ROUTE_ENUM } from 'src/constants/ml-route-constant';

@Injectable()
export class MindCheckupService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendMindCheckupRequest(createMindCheckupDto: CreateMindCheckupDto) {
    const url = this.configService.getOrThrow(ML_BASE_URL);
    const data = createMindCheckupDto;

    const res = await firstValueFrom(
      this.httpService.post(url + ML_ROUTE_ENUM.PREDICT_MENTAL_ISSUES, data),
    );

    return res.data;
  }

  async create(createMindCheckupDto: CreateMindCheckupDto) {
    const res = await this.sendMindCheckupRequest(createMindCheckupDto);
    return res;
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
