import { CreatePatientCommentDto } from 'src/modules/patient-comments/dto/create-patient-comment.dto';
import { stringToHex, TSeederNames } from 'src/utils/seeder-helpter';

type TPatientComment = {
  name: TSeederNames;
  content: string;
  index: number;
  children?: Array<number>;
};

type TChildComment = TPatientComment & {
  parent: number;
};

export const PatientCommentSeeder = () => {
  const createPosts = (name: TSeederNames) => {
    return stringToHex(`${name}post1`);
  };

  const createChildId = (name: TSeederNames, children: Array<number>) => {
    const allChildren = [];
    children?.forEach((child) => {
      allChildren.push(stringToHex(`${name}cmt${child}`));
    });

    return allChildren;
  };

  const createComment = ({
    name,
    content,
    index,
    children,
  }: TPatientComment) => {
    const comment: CreatePatientCommentDto & { _id: string } = {
      _id: stringToHex(`${name}cmt${index}`),
      content: content,
      post: createPosts(name),
      patient: stringToHex(name),
      children: createChildId(name, children),
    };
    return comment;
  };

  const createChildComment = ({
    name,
    content,
    index,
    children,
    parent,
  }: TChildComment) => {
    const comment: CreatePatientCommentDto & { _id: string } = {
      _id: stringToHex(`${name}cmt${index}`),
      content: content,
      post: createPosts(name),
      patient: stringToHex(name),
      parent: stringToHex(`${name}cmt${parent}`),
      children: createChildId(name, children),
    };
    return comment;
  };

  const firstCommentBatch = [
    createComment({
      index: 1,
      name: 'chhay',
      content: 'First comment',
      children: [11],
    }),
    createChildComment({
      index: 11,
      name: 'chhay',
      content: 'First reply',
      parent: 1,
      children: [12],
    }),
    createChildComment({
      index: 14,
      name: 'chhay',
      content: 'First Second reply',
      parent: 1,
    }),
    createChildComment({
      index: 12,
      name: 'chhay',
      content: 'First nested reply',
      parent: 11,
      children: [13],
    }),
    createChildComment({
      index: 13,
      name: 'chhay',
      content: 'First nested nested reply',
      parent: 12,
    }),
  ];

  const secondCommentBatch = [
    createComment({
      index: 2,
      name: 'chhay',
      content: 'Second comment',
      children: [21],
    }),
    createChildComment({
      index: 21,
      name: 'chhay',
      content: 'Second reply',
      parent: 2,
      children: [22],
    }),
    createChildComment({
      index: 22,
      name: 'chhay',
      content: 'Second nested reply',
      parent: 21,
      children: [23],
    }),
    createChildComment({
      index: 23,
      name: 'chhay',
      content: 'Second nested nested reply',
      parent: 22,
    }),
  ];

  const commentSeeds = [...firstCommentBatch, ...secondCommentBatch];

  return commentSeeds;
};
