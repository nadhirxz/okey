import { Router } from 'express';

const router = Router();

router.get('/status', (_, res) => res.send('ok'));

export default router;
