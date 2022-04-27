import { Router } from 'express';

import { suppliersRouter } from './suppliers.routes';

const purchasesRouter = Router();

purchasesRouter.use('/suppliers', suppliersRouter);

export { purchasesRouter };
