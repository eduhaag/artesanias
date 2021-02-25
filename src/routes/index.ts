import { Router } from 'express';

import ensureAuthenticate from '../middlewares/ensureAuthenticate';

import usersRouter from './users.routes';
import sessionsRouter from './serssions.routes';
import clientsRouter from './clients.routes';

const routes = Router();

routes.use('/auth', sessionsRouter);
routes.use(ensureAuthenticate);
routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);

export default routes;
