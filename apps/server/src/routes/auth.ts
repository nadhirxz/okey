import { Router } from 'express';
import prisma from '@okey/database/client';
import { verifyPassword } from '@okey/utils/hashing';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '@okey/auth';
import { auth, noAuth } from '../middlewares/auth';

const router = Router();

router.get('/', auth, async (_, res) => {
	res.status(200).send();
});

router.post('/login', noAuth, async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).json({ success: false, error: 'Please provide email and password' });

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user) return res.status(404).json({ success: false, error: 'User not found' });

	const passwordVerification = await verifyPassword(user.password, password);

	if (!passwordVerification) return res.status(401).json({ success: false, error: 'Invalid password' });

	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	res.cookie('access_token', accessToken)
		.status(200)
		.json({
			success: true,
			refreshToken,
			user: {
				name: user.name,
			},
		});
});

router.post('/logout', async (req, res) => {
	res.clearCookie('access_token').status(200).json({ success: true });
});

router.post('/refresh', async (req, res) => {
	const { token: refreshToken } = req.body;

	if (!refreshToken) return res.status(401).json({ success: false, error: 'Invalid token' });

	try {
		const payload = verifyRefreshToken(refreshToken);
		const user = await prisma.user.findUnique({ where: { id: payload.id } });

		if (!user) throw 401;

		const accessToken = generateAccessToken(user);
		res.cookie('access_token', accessToken).status(200).json({ success: true });
	} catch (error) {
		return res.status(401).json({ success: false, error: 'Invalid token' });
	}
});

export default router;
