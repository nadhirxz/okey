import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './routes';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
	origin: ['http://127.0.0.1:3000'],
	credentials: true,
}))

app.use(express.static(path.join(__dirname, '../../web')));

app.use('/api', router);

export default app;
