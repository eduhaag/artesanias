import { Router } from 'express';

import { shippingRouter } from './shippingMethods.routes';

const salesRouter = Router();

salesRouter.use('/shipping_methods', shippingRouter);

export { salesRouter };
