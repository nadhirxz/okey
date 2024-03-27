import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@okey/utils/hashing';
import { dotenvLoad } from 'dotenv-mono';
dotenvLoad();

const seed = async () => {
	const prisma = new PrismaClient();

	const users = [
		{ email: 'user1@mail.com', name: 'user1', password: 'sup' },
		{ email: 'user2@mail.com', name: 'user2', password: 'sup' },
		{ email: 'user3@mail.com', name: 'user3', password: 'sup' },
		{ email: 'user4@mail.com', name: 'user4', password: 'sup' },
	];

	const userPromises = users.map(async user => {
		const password = await hashPassword(user.password);
		return prisma.user.create({ data: { ...user, password } });
	});

	await Promise.all(userPromises);
};

seed();
