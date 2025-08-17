import multer from 'multer';
import { TMP_UPLOAD_DIR } from '../constants/contacts.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
