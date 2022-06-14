import { Router } from 'express';

import { CreatePurchaseController } from '@modules/purchases/useCases/purchases/createPurchase/CreatePurchaseController';
import { GetPurchaseByIDController } from '@modules/purchases/useCases/purchases/getPurchaseById/GetPurchaseByIDController';
import { ListPurchasesController } from '@modules/purchases/useCases/purchases/listPurchases/ListPurchasesController';
import { UpdatePurchaseController } from '@modules/purchases/useCases/purchases/updatePurchase/UpdatePurchaseController';
import { ChangeStatusPurchaseController } from '@modules/purchases/useCases/purchases/updateStatus/ChangeStatusPurchaseController';

import { purchaseProductsRoutes } from './purchaseProducts.routes';
import { suppliersRouter } from './suppliers.routes';

const purchasesRouter = Router();

const createPurchaseController = new CreatePurchaseController();
const getPurchaseByIDController = new GetPurchaseByIDController();
const listPurchasesController = new ListPurchasesController();
const updatePurchaseController = new UpdatePurchaseController();
const changeStatusPurchaseController = new ChangeStatusPurchaseController();

purchasesRouter.use('/suppliers', suppliersRouter);
purchasesRouter.use('/products', purchaseProductsRoutes);

purchasesRouter.post('/', createPurchaseController.handle);
purchasesRouter.get('/', listPurchasesController.handle);
purchasesRouter.get('/:id', getPurchaseByIDController.handle);
purchasesRouter.put('/', updatePurchaseController.handle);
purchasesRouter.patch('/', changeStatusPurchaseController.handle);

export { purchasesRouter };
