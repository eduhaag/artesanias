import { Router } from 'express';

import { CreateSaleStatusController } from '@modules/sales/useCases/SaleStatus/createSaleStatus/CreateSaleStatusController';
import { DeleteSaleStatusController } from '@modules/sales/useCases/SaleStatus/deleteSaleStatus/DeleteSaleStatusController';
import { ListSaleStatusController } from '@modules/sales/useCases/SaleStatus/listAllSaleStatus/ListSaleStatusController';
import { UpdateSaleStatusController } from '@modules/sales/useCases/SaleStatus/updateSaleStatus/UpdateSaleStatusController';

const saleStatusRouter = Router();

const createSaleStatusController = new CreateSaleStatusController();
const updateSaleStatusController = new UpdateSaleStatusController();
const deleteSaleStatusController = new DeleteSaleStatusController();
const listSaleStatusController = new ListSaleStatusController();

saleStatusRouter.post('/', createSaleStatusController.handle);
saleStatusRouter.put('/', updateSaleStatusController.handle);
saleStatusRouter.delete('/:id', deleteSaleStatusController.handle);
saleStatusRouter.get('/', listSaleStatusController.handle);

export { saleStatusRouter };
