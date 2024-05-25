import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreatePatientDto } from 'src/modules/patients/dto/create-patient.dto';

export const PatientFactory = ({ length }: { length: number }) => {
  const fakePatient: CreatePatientDto[] = [];
  Array.from({ length }).forEach(() => {
    fakePatient.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      phone_number: '+855' + faker.string.numeric(8),
      gender: GENDER.MALE,
    });
  });

  return fakePatient;
};
