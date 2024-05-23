import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from 'src/schemas/patient.schema';
import { Model } from 'mongoose';
import { phoneFormat } from 'src/utils/helpter';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const res = await this.patientModel.create({
        phone_number: phoneFormat(createPatientDto.phone_number.trim()),
        ...createPatientDto,
      });
      return res;
    } catch (e) {
      return e;
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

  async remove(id: string) {
    const res = await this.patientModel.deleteOne({ _id: id });
    return res;
  }
}
