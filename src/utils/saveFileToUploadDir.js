import * as fs from 'node:fs/promises';
import path from 'node:path';
import { TMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/contacts.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};
