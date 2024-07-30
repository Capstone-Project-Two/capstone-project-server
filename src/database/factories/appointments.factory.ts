import { Model } from 'mongoose';
import { Therapist } from '../schemas/therapist.schema';
import { CreateAppointmentDto } from 'src/modules/appointments/dto/create-appointment.dto';
import { faker } from '@faker-js/faker';
import { APNT_STATUS } from 'src/constants/apnt-status-constant';
import { Patient } from '../schemas/patient.schema';

export const AppointmentFactory = async (
  { length }: { length?: number },
  therapistModel: Model<Therapist>,
  patientModel: Model<Patient>,
) => {
  
  const therapists = await therapistModel.find().limit(1);
  const patients = await patientModel.find().limit(1);

  const fakeAppointment: CreateAppointmentDto[] = [];
  Array.from({ length: length ?? 10 }).forEach(() => {
    fakeAppointment.push({
      note: faker.lorem.sentence(1),
      patient: patients[0].id,
      therapist: therapists[0].id,
      scheduleDate: faker.date.recent(),
      status: APNT_STATUS.REQUESTED,
      symptoms: faker.lorem.sentence(1),
      end_time: faker.date.anytime(),
      start_time: faker.date.anytime(),
    });
  });

  return [...fakeAppointment];
};
