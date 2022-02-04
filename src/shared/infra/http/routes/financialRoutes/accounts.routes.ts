import { Router } from 'express';

import { CreateBankAccountController } from '@modules/financial/useCases/bankAccounts/createBankAccount/CreateBankAccountController';
import { DeleteBankAccountController } from '@modules/financial/useCases/bankAccounts/deleteAccount/DeleteBankAccountController';
import { ListAllAccountsController } from '@modules/financial/useCases/bankAccounts/listBankAccounts/ListAllAccountsController';
import { UpdateBankAccountController } from '@modules/financial/useCases/bankAccounts/updateBankAccount/UpdateBankAccountController';

const accountsRouter = Router();

const createBankAccountController = new CreateBankAccountController();
const updateBankAccountController = new UpdateBankAccountController();
const listAllAccountsController = new ListAllAccountsController();
const deleteBankAccountController = new DeleteBankAccountController();

accountsRouter.post('/', createBankAccountController.handle);
accountsRouter.put('/', updateBankAccountController.handle);
accountsRouter.get('/', listAllAccountsController.handle);
accountsRouter.delete('/:id', deleteBankAccountController.handle);

export { accountsRouter };
