import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreatePatientDto } from 'src/modules/patients/dto/create-patient.dto';
import { stringToHex } from 'src/utils/seeder-helpter';

export const PatientFactory = ({ length }: { length?: number }) => {
  const fakePatient: CreatePatientDto[] = [];
  const admin: CreatePatientDto & { _id: string } = {
    _id: stringToHex('admin'),
    username: 'admin',
    email: `admin@email.com`,
    gender: GENDER.MALE,
    phone_number: '+85512345678',
  };
  Array.from({ length: length ?? 10 }).forEach(() => {
    fakePatient.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      phone_number: '+855' + faker.string.numeric(8),
      gender: GENDER.MALE,
    });
  });

  return [admin, ...fakePatient];
};
