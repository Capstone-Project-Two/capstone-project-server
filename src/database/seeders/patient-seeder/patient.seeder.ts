import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { stringToHex } from 'src/utils/seed-helpter';

export type TPatient =
  | 'chhay'
  | 'rpong'
  | 'panha'
  | 'vchit'
  | 'lizaj'
  | 'lizac';

export const PatientSeeder = () => {
  const createPosts = (name: TPatient) => {
    const list = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      list.push(stringToHex(`${name.slice(0, 4)}${index}`));
    });
    return list;
  };

  const createUsers = (name: TPatient) => {
    const list = [];
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
    ...createUsers('chhay'),
    ...createUsers('rpong'),
    ...createUsers('panha'),
    ...createUsers('vchit'),
    ...createUsers('lizaj'),
    ...createUsers('lizac'),
  ];

  return patientSeeds;
};
