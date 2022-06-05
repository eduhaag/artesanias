import { Router } from 'express';

import { CreateLedgerController } from '@modules/financial/useCases/ledgers/createLedger/CreateLedgerController';
import { DeleteLedgerController } from '@modules/financial/useCases/ledgers/deleteLedger/DeleteLedgerController';
import { ListLedgersController } from '@modules/financial/useCases/ledgers/listLedgers/ListLedgersController';
import { UpdateLedgerController } from '@modules/financial/useCases/ledgers/updateLedger/UpdateLedgerController';

const ledgerRoutes = Router();

const createLedgerController = new CreateLedgerController();
const updateLedgerController = new UpdateLedgerController();
const listLedgersController = new ListLedgersController();
const deleteLedgerController = new DeleteLedgerController();

ledgerRoutes.post('/', createLedgerController.handle);
ledgerRoutes.put('/', updateLedgerController.handle);
ledgerRoutes.get('/', listLedgersController.handle);
ledgerRoutes.delete('/:id', deleteLedgerController.handle);

export { ledgerRoutes };
