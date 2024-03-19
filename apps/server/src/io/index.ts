import type { Server } from 'socket.io';

let onlinePlayers = new Array(); //TODO: Should not exceed 4 players!
var currentPlayer = 1;
let drawTile = false; // !???
let remainingDeck = [];

export const initIO = (io: Server) => {
	io.on('connection', socket => {
		console.log('User connected: ' + socket.id);
		io.emit('players', onlinePlayers);
	});

	io.on('disconnect', reason => {
		console.log('a user disconnected:', reason);
	});
};
