import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Therapist, TherapistSchema } from 'src/database/schemas/therapist.schema';
import { Patient, PatientSchema } from 'src/database/schemas/patient.schema';
import { Appointment, AppointmentSchema } from 'src/database/schemas/appointment.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: Therapist.name, schema: TherapistSchema},
    {name: Patient.name, schema: PatientSchema},
    {name: Appointment.name, schema: AppointmentSchema},
  ])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
