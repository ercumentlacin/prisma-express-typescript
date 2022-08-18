import 'dotenv/config';
import 'module-alias/register';

import { App } from './app';
import { config } from './constants';
import { Routes } from './routes';

const app = new App(new Routes().routes, config.port);

app.listen();
