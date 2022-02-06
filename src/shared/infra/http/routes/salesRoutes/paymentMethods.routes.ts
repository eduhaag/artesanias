import { Router } from 'express';

import { CreatePaymentMethodController } from '@modules/sales/useCases/PaymentMethods/createPaymentMethod/CreatePaymentMethodController';
import { DeletePaymentMethodController } from '@modules/sales/useCases/PaymentMethods/deletePaymentMethod/DeletePaymentMethodController';
import { ListPaymentMethodsController } from '@modules/sales/useCases/PaymentMethods/listPaymentMethods/ListPaymentMethodsController';
import { UpdatePaymentMethodController } from '@modules/sales/useCases/PaymentMethods/updatePaymentMethod/UpdatePaymentMethodController';

const paymentRouter = Router();

const createPaymentMethodController = new CreatePaymentMethodController();
const updatePaymentMethodController = new UpdatePaymentMethodController();
const listPaymentMethodsController = new ListPaymentMethodsController();
const deletePaymentMethodController = new DeletePaymentMethodController();

paymentRouter.post('/', createPaymentMethodController.handle);
paymentRouter.put('/', updatePaymentMethodController.handle);
paymentRouter.get('/', listPaymentMethodsController.handle);
paymentRouter.delete('/:id', deletePaymentMethodController.handle);

export { paymentRouter };
