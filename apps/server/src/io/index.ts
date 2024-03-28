import type { Server } from 'socket.io';
import Game from '../game/game';
import { getTokenPayload } from '@okey/auth';
import userStatusManager from '../services/status';
import { NUMBER_OF_PLAYERS } from '@okey/utils/constants';

const game = new Game();

export const initIO = (io: Server) => {
	io.on('connection', socket => {
		const { token } = socket.handshake.auth;

		const user = getTokenPayload(token);
		if (!user) {
			socket.disconnect();
			return;
		}

		console.log('a user connected:', user);
		userStatusManager.goOnline(user.id);
		socket.join(game.id);

		socket.on('disconnect', () => {
			game.removePlayer(user.id);
			userStatusManager.goOffline(user.id);

			console.log('user disconnected:', user);
		});

		const playerIDs = game.addPlayer(user.id);
		if (playerIDs.length == NUMBER_OF_PLAYERS) {
			game.start();
			io.to(game.id).emit('game-start', game.players);
		}
	});
};
