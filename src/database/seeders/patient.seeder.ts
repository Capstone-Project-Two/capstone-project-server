import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreatePatientDto } from 'src/modules/patients/dto/create-patient.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';
import data from 'public/data/static-img.json';

type TPatientSeed = {
  name: TSeederNames;
  index: number;
};

const imgMap = {
  1: data.profileImg.one,
  2: data.profileImg.two,
  3: data.profileImg.three,
  4: data.profileImg.four,
  5: data.profileImg.five,
  6: data.profileImg.six,
  7: data.profileImg.seven,
  8: data.profileImg.eight,
  9: data.profileImg.nine,
  10: data.profileImg.ten,
};

function getRandomImage() {
  const keys = Object.keys(imgMap);

  const randomIndex = Math.floor(Math.random() * keys.length);

  const randomKey = keys[randomIndex];

  return imgMap[randomKey];
}

export const PatientSeeder = () => {
  const createPosts = ({ name, index }: TPatientSeed) => {
    return stringToHex(`${name}post${index}`);
  };

  const createPatient = ({ name, index }: TPatientSeed) => {
    const patient: CreatePatientDto & { _id: string; posts: Array<string> } = {
      _id: stringToHex(name),
      email: `${name}@gmail.com`,
      credits: 0,
      gender:
        name !== 'lizac' && name !== 'lizaj' ? GENDER.MALE : GENDER.FEMALE,
      phone_number: '+855' + faker.string.numeric(8),
      username: name,
      posts: [
        createPosts({
          name,
          index,
        }),
      ],
      profile_img: getRandomImage(),
    };
    return patient;
  };

  const patientSeeds = [
    createPatient({ name: 'chhay', index: 1 }),
    createPatient({ name: 'rpong', index: 2 }),
    createPatient({ name: 'panha', index: 3 }),
    createPatient({ name: 'vchit', index: 4 }),
    createPatient({ name: 'lizaj', index: 5 }),
    createPatient({ name: 'lizac', index: 6 }),
  ];

  return patientSeeds;
};
