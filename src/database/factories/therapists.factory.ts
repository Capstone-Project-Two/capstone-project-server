import { faker } from '@faker-js/faker';
import { GENDER } from 'src/constants/gender-constant';
import { CreateTherapistDto } from 'src/modules/therapists/dto/create-therapist.dto';

export const TherapistFactory = ({ length }: { length?: number }) => {
  const fakeTherapist: CreateTherapistDto[] = [];
  Array.from({ length: length ?? 10 }).forEach(() => {
    fakeTherapist.push({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      phone_number: '+855' + faker.string.numeric(8),
      gender: GENDER.MALE,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      bio: faker.lorem.sentence(100),
      specializations: ['Divorce', 'Education', 'Physician'],
    });
  });

  return [...fakeTherapist];
};
