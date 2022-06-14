import { Router } from 'express';

import { CreateInvetoryMovimentController } from '@modules/products/useCases/inventory/createInventoryMoviment/CreateInvetoryMovimentController';
import { DeleteInventoryMovimentController } from '@modules/products/useCases/inventory/deleteInventoryMoviment/DeleteInventoryMovimentController';
import { UpdateInventoryByMaterialArrayController } from '@modules/products/useCases/inventory/updateInventoryByMaterialArray/UpdateInventoryByMaterialArrayController';

const invetoryRouter = Router();

const createInvetoryMovimentController = new CreateInvetoryMovimentController();
const deleteInventoryMovimentController =
  new DeleteInventoryMovimentController();
const updateInventoryByMaterialArrayController =
  new UpdateInventoryByMaterialArrayController();

invetoryRouter.post('/', createInvetoryMovimentController.handle);
invetoryRouter.delete('/:id', deleteInventoryMovimentController.handle);
invetoryRouter.post('/update', updateInventoryByMaterialArrayController.handle);

export { invetoryRouter };
