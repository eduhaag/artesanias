import { Router } from 'express';

import { CreateSaleController } from '@modules/sales/useCases/sales/createSale/CreateSaleController';
import { FindSaleByIDController } from '@modules/sales/useCases/sales/getSaleById/FindSaleByIDController';
import { ListSalesController } from '@modules/sales/useCases/sales/listSales/ListSalesController';
import { UpdateSaleController } from '@modules/sales/useCases/sales/updateSale/UpdateSaleController';
import { UpdateSaleStatusController } from '@modules/sales/useCases/sales/updateSaleStatus/UpdateSaleStatusController';

import { paymentRouter } from './paymentMethods.routes';
import { saleChannelsRouter } from './saleChannel.routes';
import { saleProductsRouter } from './saleProducts.routes';
import { saleStatusRouter } from './saleStatus.routes';
import { shippingRouter } from './shippingMethods.routes';

const salesRouter = Router();

const createSaleController = new CreateSaleController();
const updateSaleController = new UpdateSaleController();
const findSaleByIDController = new FindSaleByIDController();
const listSalesController = new ListSalesController();
const updateSaleStatusController = new UpdateSaleStatusController();

salesRouter.use('/shipping_methods', shippingRouter);
salesRouter.use('/payment_methods', paymentRouter);
salesRouter.use('/sale_status', saleStatusRouter);
salesRouter.use('/sale_channels', saleChannelsRouter);
salesRouter.use('/products', saleProductsRouter);

salesRouter.post('/', createSaleController.handle);
salesRouter.put('/', updateSaleController.handle);
salesRouter.patch('/', updateSaleStatusController.handle);
salesRouter.get('/', listSalesController.handle);
salesRouter.get('/:id', findSaleByIDController.handle);

export { salesRouter };
