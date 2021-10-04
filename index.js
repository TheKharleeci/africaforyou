/* istanbul ignore file */
import express from 'express';
import { appConfig } from './config';
import Logger from './config/logger';

const app = express();
global.logger = Logger.createLogger({ label: 'AFRICAFORYOU' });

appConfig(app);

export default app;