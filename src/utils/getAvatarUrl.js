import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const getAvatarUrl = async (avatar) => {
  if (!avatar) return null;

  const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';

  if (useCloudinary) {
    return await saveFileToCloudinary(avatar);
  }

  return await saveFileToUploadDir(avatar);
};
