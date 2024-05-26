import { Model } from 'mongoose';

export type TSeederNames =
  | 'chhay'
  | 'rpong'
  | 'panha'
  | 'vchit'
  | 'lizaj'
  | 'lizac';

async function drop(model: Model<any>) {
  try {
    const res = await model.deleteMany();
    return res;
  } catch (e) {
    return e;
  }
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

/**
 * @description ID examples
 * @example PatientId: TSeederNames
 * @example PostId: TSeederNames+"post"+index
 *
 * // Other id examples
 * */
export function stringToHex(str: string) {
  const hexString = str
    .split('')
    .map((char) => char.charCodeAt(0).toString(16))
    .join('');

  // Slice string if over 24
  if (hexString.length > 24) {
    return hexString.slice(0, 24);
  }

  const missingLength = 24 - hexString.length;

  // return string if is 24
  if (missingLength === 0) {
    return hexString;
  }

  // append leftover hex string
  let result = hexString;
  for (let i = 0; i < missingLength; i++) {
    result += i.toString(16);
  }
  return result;
}
