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
import { STATUS } from 'src/constants/status-constant';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Therapist.name) private therapistModel: Model<Therapist>,
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
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
  }

  async findAll() {
    const res = await this.appointmentModel
      .find()
      .populate(['patient', 'therapist']);
    return res;
  }

  async findOne(id: string) {
    const res = await this.appointmentModel
      .findOne({
        _id: id,
      })
      .populate(['patient', 'therapist']);
    return res;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentModel.findOne({
      _id: id,
    });
    if (!appointment) {
      throw new NotFoundException('Appointment does not exist');
    }

    //Update the status of the appointment
    const res = await appointment.updateOne(updateAppointmentDto);

    return res;
  }

  remove(id: string) {
    return `This action removes a #${id} appointment`;
  }
}
