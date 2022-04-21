import { Router } from 'express';

import { CreateSaleProductController } from '@modules/sales/useCases/saleProducts/createSaleProduct/CreateSaleProductController';
import { DeleteSaleProductController } from '@modules/sales/useCases/saleProducts/deleteSaleProduct/DeleteSaleProductController';
import { UpdateSaleProductController } from '@modules/sales/useCases/saleProducts/updateSaleProduct/UpdateSaleProductController';

const saleProductsRouter = Router();

const createSaleProductController = new CreateSaleProductController();
const updateSaleProductController = new UpdateSaleProductController();
const deleteSaleProductController = new DeleteSaleProductController();

saleProductsRouter.post('/', createSaleProductController.handle);
saleProductsRouter.put('/', updateSaleProductController.handle);
saleProductsRouter.delete('/:id', deleteSaleProductController.handle);

export { saleProductsRouter };
