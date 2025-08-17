import { Router } from 'express';
import contactsRouter from '../routes/contacts.route.js';
import authRouter from '../routes/auth.route.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/contacts', authenticate, contactsRouter);

export default router;
