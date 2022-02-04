import { Router } from 'express';

import { accountsRouter } from './accounts.routes';

const financialRouter = Router();

financialRouter.use('/accounts', accountsRouter);

export { financialRouter };
