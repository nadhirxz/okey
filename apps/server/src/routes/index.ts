import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

router.get('/status', (_, res) => res.send('ok'));

router.use('/auth', authRoutes);

export default router;
