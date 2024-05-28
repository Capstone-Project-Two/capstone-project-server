import { faker } from '@faker-js/faker';
import { UpdateLikePostDto } from 'src/modules/like-posts/dto/update-like-post.dto';
import { CreatePostDto } from 'src/modules/posts/dto/create-post.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';

export const PostSeeder = () => {
  const createPosts = (name: TSeederNames) => {
    const list: Array<CreatePostDto & { _id: string }> = [];
    Array.from({ length: 5 }).forEach((_, index) => {
      createLikes(name);
      list.push({
        _id: stringToHex(`${name}post${index}`),
        body: faker.lorem.sentence(5),
        patient: stringToHex(name),
      });
    });
    return list;
  };

  const createLikes = (name: TSeederNames) => {
    const names: TSeederNames[] = [
      'chhay',
      'lizac',
      'lizaj',
      'rpong',
      'panha',
      'vchit',
    ];
    const list: Array<UpdateLikePostDto> = [];

    names.forEach((val, index) => {
      if (val !== name && name) {
        list.push({
          patient: stringToHex(name),
          post: stringToHex(`${name}post${index}`),
        });
      }
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
