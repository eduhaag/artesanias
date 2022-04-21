import { Router } from 'express';

import { CreateInvetoryMovimentController } from '@modules/products/useCases/inventory/createInventoryMoviment/CreateInvetoryMovimentController';
import { DeleteInventoryMovimentController } from '@modules/products/useCases/inventory/deleteInventoryMoviment/DeleteInventoryMovimentController';

const invetoryRouter = Router();

const createInvetoryMovimentController = new CreateInvetoryMovimentController();
const deleteInventoryMovimentController =
  new DeleteInventoryMovimentController();

invetoryRouter.post('/', createInvetoryMovimentController.handle);
invetoryRouter.delete('/:id', deleteInventoryMovimentController.handle);

export { invetoryRouter };
