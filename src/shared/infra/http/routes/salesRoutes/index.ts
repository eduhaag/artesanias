import { Router } from 'express';

import { paymentRouter } from './paymentMethods.routes';
import { saleStatusRouter } from './saleStatus.routes';
import { shippingRouter } from './shippingMethods.routes';

const salesRouter = Router();

salesRouter.use('/shipping_methods', shippingRouter);
salesRouter.use('/payment_methods', paymentRouter);
salesRouter.use('/sale_status', saleStatusRouter);

export { salesRouter };
