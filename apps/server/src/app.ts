import express from 'express';
import path from 'path';
import helmet from 'helmet';

const app = express();

app.use(helmet())

app.use(express.static(path.join(__dirname, '../../web')));

export default app;