import { GENDER } from 'src/constants/gender-constant';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';
import data from 'public/data/static-img.json';

type TAdminSeed = {
  name: TSeederNames;
  index: number;
};

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

export const PatientCredSeeder = () => {
  const createPosts = ({ name, index }: TPatientSeed) => {
    return stringToHex(`${name}post${index}`);
  };
  
  const createPatientCred = ({ name, index }: TAdminSeed) => {
    const patientCred: RegisterDto & { _id: string; posts: Array<string>; } = {
      _id: stringToHex(name),
      email: `${name}@gmail.com`,
      password: `P@$$w0rd`,
      credential: stringToHex(`${name}cred${index}`),
      credits: 0,
      gender:
        name !== 'lizac' && name !== 'lizaj' ? GENDER.MALE : GENDER.FEMALE,
      // phone_number: '+855' + faker.string.numeric(8),
      username: name,
      posts: [
        createPosts({
          name,
          index,
        }),
      ],
      profile_img: getRandomImage(),
    };

    return patientCred;
  };

  const patientCredSeeds = [
    createPatientCred({
      name: 'chhay',
      index: 1,
    }),
    createPatientCred({
      name: 'rpong',
      index: 2,
    }),
    createPatientCred({
      name: 'panha',
      index: 3,
    }),
    createPatientCred({
      name: 'vchit',
      index: 4,
    }),
    createPatientCred({
      name: 'lizac',
      index: 5,
    }),
    createPatientCred({
      name: 'lizaj',
      index: 6,
    }),

  ];

  return patientCredSeeds;
};
