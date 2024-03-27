import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './routes';

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../web')));

app.use('/api', router);

export default app;
