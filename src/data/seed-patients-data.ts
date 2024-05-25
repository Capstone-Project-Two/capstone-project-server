import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreatePatientDto } from 'src/modules/patients/dto/create-patient.dto';

const staticPatient: CreatePatientDto[] = [
  {
    email: 'chhay@test.com',
    gender: GENDER.MALE,
    phone_number: '+85512355162',
    username: 'justchhayxp',
  },
  {
    email: 'pong@test.com',
    gender: GENDER.MALE,
    phone_number: '+85512792811',
    username: 'rpongem',
  },
  {
    email: 'panha@test.com',
    gender: GENDER.MALE,
    phone_number: '+85512345678',
    username: 'krp',
  },
  {
    email: 'vchit@test.com',
    gender: GENDER.MALE,
    phone_number: '+85512345682',
    username: 'vchir',
  },
  {
    email: 'lizaJ@test.com',
    gender: GENDER.FEMALE,
    phone_number: '+85512345679',
    username: 'lizaj',
  },
  {
    email: 'lizaC@test.com',
    gender: GENDER.FEMALE,
    phone_number: '+85512345681',
    username: 'lizac',
  },
];

export const fakePatients = ({ length }: { length: number }) => {
  const fakePatient: CreatePatientDto[] = [];
  Array.from({ length }).forEach(() => {
    fakePatient.push({
      ...staticPatient,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      phone_number: '+855' + faker.string.numeric(8),
      gender: GENDER.MALE,
    });
  });

  return fakePatient;
};
