import { Router } from 'express';

import { CreateShippingMethodController } from '@modules/sales/useCases/ShippingMethods/createShippingMethod/CreateShippingMethodController';
import { DeleteShippingMethodController } from '@modules/sales/useCases/ShippingMethods/deleteShippingMethod/DeleteShippingMethodController';
import { ListAllShippingMethodsController } from '@modules/sales/useCases/ShippingMethods/listAllShippingMethods/ListAllShippingMethodsController';
import { UpdateShippingMethodController } from '@modules/sales/useCases/ShippingMethods/updateShippingMethod/UpdateShippingMethodController';

const shippingRouter = Router();

const createShippingMethodController = new CreateShippingMethodController();
const updateShippingMethodController = new UpdateShippingMethodController();
const deleteShippingMethodController = new DeleteShippingMethodController();
const listAllShippingMethodsController = new ListAllShippingMethodsController();

shippingRouter.post('/', createShippingMethodController.handle);
shippingRouter.put('/', updateShippingMethodController.handle);
shippingRouter.get('/', listAllShippingMethodsController.handle);
shippingRouter.delete('/:id', deleteShippingMethodController.handle);

export { shippingRouter };
