import { Router } from 'express';

import { CreateSupplierController } from '@modules/purchases/useCases/suppliers/createSupplier/CreateSupplierController';
import { GetSupplierByIdController } from '@modules/purchases/useCases/suppliers/getSupplierById/GetSupplierByIdController';
import { ListAllSuppliersController } from '@modules/purchases/useCases/suppliers/listAllSuppliers/ListAllSuppliersController';
import { UpdateSupplierController } from '@modules/purchases/useCases/suppliers/updateSupplier/UpdateSupplierController';

const suppliersRouter = Router();

const createSupplierController = new CreateSupplierController();
const updateSupplierController = new UpdateSupplierController();
const getSupplierByIdController = new GetSupplierByIdController();
const listAllSuppliersController = new ListAllSuppliersController();

suppliersRouter.post('/', createSupplierController.handle);
suppliersRouter.get('/', listAllSuppliersController.handle);
suppliersRouter.put('/:id', updateSupplierController.handle);
suppliersRouter.get('/:id', getSupplierByIdController.handle);

export { suppliersRouter };
