import { join } from 'path';

const oneKb = 1024;
const oneMb = oneKb * 1024;
const maxSize = 5 * oneMb;

export const FILE_DESTINATION = join(process.cwd(), 'src', 'uploads');
export const MAX_FILE_SIZE = maxSize;
