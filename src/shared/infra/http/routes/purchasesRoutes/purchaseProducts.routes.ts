import { Router } from 'express';

import { CreatePurchaseProductController } from '@modules/purchases/useCases/purchaseProducts/createPurchaseProduct/CreatePurchaseProductController';
import { DeletePurchaseProductController } from '@modules/purchases/useCases/purchaseProducts/deletePurchaseProduct/DeletePurchaseProductController';
import { UpdatePurchaseProductController } from '@modules/purchases/useCases/purchaseProducts/updatePurchaseProduct/UpdatePurchaseProductController';

const purchaseProductsRoutes = Router();

const createPurchaseProductController = new CreatePurchaseProductController();
const updatePurchaseProductController = new UpdatePurchaseProductController();
const deletePurchaseProductController = new DeletePurchaseProductController();

purchaseProductsRoutes.post('/', createPurchaseProductController.handle);
purchaseProductsRoutes.put('/', updatePurchaseProductController.handle);
purchaseProductsRoutes.delete('/:id', deletePurchaseProductController.handle);

export { purchaseProductsRoutes };
