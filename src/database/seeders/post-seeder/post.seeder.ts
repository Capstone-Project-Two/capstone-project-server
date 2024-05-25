import { faker } from '@faker-js/faker';
import { stringToHex } from 'src/utils/seed-helpter';

export const PostSeeder = () => {
  const createPosts = (name: string) => {
    const list = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      list.push({
        _id: stringToHex(`${name.slice(0, 4)}${index}`),
        body: faker.lorem.sentence(5),
        patient: stringToHex(name),
      });
    });
    return list;
  };

  const postSeeds = [
    ...createPosts('chhay'),
    ...createPosts('rpong'),
    ...createPosts('panha'),
    ...createPosts('vchit'),
    ...createPosts('lizaj'),
    ...createPosts('lizac'),
  ];

  return postSeeds;
};
