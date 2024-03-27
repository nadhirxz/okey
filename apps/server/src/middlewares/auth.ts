import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '@okey/auth';

const auth = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies.access_token;
	if (!accessToken) return res.status(401).json({ success: false, error: 'Invalid token' });

	try {
		const payload = verifyAccessToken(accessToken);
		req.user = payload;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, error: 'Invalid token' });
	}

	next();
};

const noAuth = (req: Request, res: Response, next: NextFunction) => {
	const accessToken = req.cookies.access_token;
	if (accessToken) {
		try {
			verifyAccessToken(accessToken);
			throw 401;
		} catch (error) {
			if (error == 401) return res.status(401).json({ success: false, error: "You're already logged in" });
		}
	}

	next();
};

export { auth, noAuth };
