import app from './app';
import http from 'http';
import { Server } from 'socket.io';
import { initIO } from './io';

const init = () => {
	const port = parseInt(process.env.SERVER_PORT!) || 5000;
	const server = http.createServer(app);
	const io = new Server(server);

	initIO(io);

	server.listen(port, () => console.log(`Server started on http://localhost:${port}`));
};

init();
