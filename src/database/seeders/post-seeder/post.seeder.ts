import { faker } from '@faker-js/faker';
import { CreatePostDto } from 'src/modules/posts/dto/create-post.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';

export const PostSeeder = () => {
  const createPosts = (name: TSeederNames) => {
    const list: Array<CreatePostDto & { _id: string }> = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      list.push({
        _id: stringToHex(`${name}post${index}`),
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
