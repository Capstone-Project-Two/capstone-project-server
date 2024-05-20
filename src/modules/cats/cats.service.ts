import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from 'src/schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatResponseDto } from './dto/response/cat-response.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll(): Promise<Array<CatResponseDto>> {    
    return await this.catModel.find().exec();
  }

  async createCat(createCatDto: CreateCatDto) {
    const res = await this.catModel.create(createCatDto);
    return res;
  }
}
