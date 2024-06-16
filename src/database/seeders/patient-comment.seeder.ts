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

  const patientSeeds = [
    createComment({
      index: 1,
      name: 'chhay',
      content: 'First comment',
      children: [2],
    }),
    createComment({
      index: 5,
      name: 'chhay',
      content: 'Second comment',
    }),
    createChildComment({
      index: 2,
      name: 'chhay',
      content: 'First reply',
      parent: 1,
      children: [3],
    }),
    createChildComment({
      index: 3,
      name: 'chhay',
      content: 'First nested reply',
      parent: 2,
      children: [4],
    }),
    createChildComment({
      index: 4,
      name: 'chhay',
      content: 'First nested nested reply',
      parent: 3,
    }),
  ];

  return patientSeeds;
};
