import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import {
  FILE_DESTINATION,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
} from 'src/constants/multer-file-constant';

export type TFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};

const fileName = (
  _: any,
  file: TFile,
  callback: (error: Error | null, filename: string) => void,
) => {
  const uniquePrefix =
    'cp' + '-' + Date.now() + '-' + Math.round(Math.random() * 1e9);

  callback(null, uniquePrefix + '_' + file.originalname);
};

const fileFilter = (
  _: any,
  file: TFile,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  const validImageReg = new RegExp(/\.(jpg|jpeg|png|webp|svg)$/);
  if (!file.originalname || !file.originalname.match(validImageReg)) {
    return callback(
      new BadRequestException('File must be of type jpg|jpeg|png|webp|svg'),
      false,
    );
  }
  callback(null, true);
};

export const multerOptions: MulterOptions = {
  dest: FILE_DESTINATION,
  fileFilter: fileFilter,
  limits: {
    files: MAX_FILE_COUNT,
    fileSize: MAX_FILE_SIZE,
  },
  storage: diskStorage({
    filename: fileName,
    destination: FILE_DESTINATION,
  }),
};
