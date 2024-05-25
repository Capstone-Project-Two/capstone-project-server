import { Model } from 'mongoose';

async function drop(model: Model<any>) {
  try {
    const res = await model.deleteMany();
    return res;
  } catch (e) {
    return e;
  }
}

export function stringToHex(str: string) {
  const hexString = str
    .split('')
    .map((char) => char.charCodeAt(0).toString(16))
    .join('');
  return `${hexString.slice(0, 11)}abcdef12345678`;
}

export async function seed({
  model,
  seedData,
}: {
  model: Model<any>;
  seedData: any;
}) {
  try {
    const res = await drop(model).then(async () => {
      const res = await model.insertMany(seedData);
      return res;
    });
    return res;
  } catch (e) {
    return e;
  }
}
