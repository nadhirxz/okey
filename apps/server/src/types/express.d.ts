import type { AccessTokenPayload } from '@okey/auth';

declare module 'express-serve-static-core' {
	interface Request {
		user?: AccessTokenPayload;
	}
}
