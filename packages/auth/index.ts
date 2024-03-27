import { User } from '@okey/database';
import { VerifyOptions, sign, verify, decode } from 'jsonwebtoken';
import { dotenvLoad } from 'dotenv-mono';
dotenvLoad();

const generateAccessTokenPayloadFromUser = (user: User) => ({
	id: user.id,
	name: user.name,
	email: user.email,
});

const generateRefreshTokenPayloadFromUser = (user: User) => ({
	id: user.id,
});

export type AccessTokenPayload = ReturnType<typeof generateAccessTokenPayloadFromUser>;
export type RefreshTokenPayload = ReturnType<typeof generateRefreshTokenPayloadFromUser>;

export const generateAccessToken = (user: User) =>
	sign(generateAccessTokenPayloadFromUser(user), process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: '15m',
	});

export const generateRefreshToken = (user: User) =>
	sign(generateRefreshTokenPayloadFromUser(user), process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: '1d',
	});

export const verifyAccessToken = (token?: string, options?: VerifyOptions) => verify(token ?? '', process.env.ACCESS_TOKEN_SECRET!, options) as unknown as AccessTokenPayload;

export const verifyRefreshToken = (token?: string, options?: VerifyOptions) => verify(token ?? '', process.env.REFRESH_TOKEN_SECRET!, options) as unknown as RefreshTokenPayload;

export const decodeToken = (token?: string) => decode(token ?? '');

export const getTokenPayload = (token: string = '') => {
	if (!token) return null;
	try {
		const payload = verifyAccessToken(token ?? '');

		return {
			id: payload.id,
			name: payload.name,
			email: payload.email,
		} satisfies AccessTokenPayload;
	} catch {
		return null;
	}
};
