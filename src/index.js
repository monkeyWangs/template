/* eslint-disable import/first */
import './initialize';
import MioxCore from 'miox-core';
import animate from 'miox-animate';
import { Engine } from 'miox-vue2x';
import WebRouter from './routes';

MioxCore(async app => {
    app.set('animate', animate());
    app.set('engine', Engine);
    app.use(WebRouter.routes());
});
