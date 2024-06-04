import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreatePatientDto } from 'src/modules/patients/dto/create-patient.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';

export const PatientSeeder = () => {
  const createPosts = (name: TSeederNames) => {
    const list = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      list.push(stringToHex(`${name}post${index}`));
    });
    return list;
  };

  const createPatient = (name: TSeederNames) => {
    const list: Array<
      CreatePatientDto & { _id: string; posts: Array<string> }
    > = [];
    list.push({
      _id: stringToHex(name),
      email: `${name}@gmail.com`,
      gender:
        name !== 'lizac' && name !== 'lizaj' ? GENDER.MALE : GENDER.FEMALE,
      phone_number: '+855' + faker.string.numeric(8),
      username: name,
      posts: createPosts(name),
    });
    return list;
  };

  const patientSeeds = [
    ...createPatient('chhay'),
    ...createPatient('rpong'),
    ...createPatient('panha'),
    ...createPatient('vchit'),
    ...createPatient('lizaj'),
    ...createPatient('lizac'),
  ];

  return patientSeeds;
};
