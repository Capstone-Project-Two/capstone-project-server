import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Therapist } from 'src/database/schemas/therapist.schema';
import { Patient } from 'src/database/schemas/patient.schema';
import { isValidObjectId, Model } from 'mongoose';
import { Appointment } from 'src/database/schemas/appointment.schema';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Therapist.name) private therapistModel: Model<Therapist>,
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      //Check if patient ID is valid
      if (!isValidObjectId(createAppointmentDto.patient)) {
        throw new BadRequestException('Invalid Patient Id');
      }

      const findPatient = await this.patientModel.findById(
        createAppointmentDto.patient,
      );

      if (!findPatient) {
        throw new NotFoundException('Patient does not exist');
      }
      //Check if therapist ID is valid
      if (!isValidObjectId(createAppointmentDto.therapist)) {
        throw new BadRequestException('Invalid Therapist Id');
      }

      const findTheraist = await this.therapistModel.findById(
        createAppointmentDto.therapist,
      );

      if (!findTheraist) {
        throw new NotFoundException('Therapist does not exist');
      }
      const res = await this.appointmentModel.create(createAppointmentDto);
      return res;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all appointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
