import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/schemas/patient.schema';
import { Model } from 'mongoose';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const res = await this.patientModel.create(createPatientDto);
      return res;
    } catch (e) {
      return {
        statusCode: e.code,
        message: e.message,
      };
    }
  }

  async findAll() {
    const res = await this.patientModel.find().exec();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
