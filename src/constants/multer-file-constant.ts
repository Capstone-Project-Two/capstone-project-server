import { join } from 'path';

const oneKb = 1024;
const oneMb = oneKb * 1024;
const maxSize = 5 * oneMb;

const baseFilePath = join(__dirname, '..', '..', 'uploads');

export const PostPhotosPath = '/post-photos';

export const STATIC_FILE_DESTINATION = baseFilePath;
export const MAX_FILE_SIZE = maxSize;
export const MAX_FILE_COUNT = 10;
