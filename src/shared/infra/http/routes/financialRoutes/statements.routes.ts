import { Router } from 'express';

import { CreateStatementController } from '@modules/financial/useCases/statments/createStatement/CreateStatementController';
import { DeleteStatementsController } from '@modules/financial/useCases/statments/deleteStatements/DeleteStatementsController';
import { LauchStatementsController } from '@modules/financial/useCases/statments/lauchStatements/LauchStatementsController';
import { ListStatementsController } from '@modules/financial/useCases/statments/listStatements/ListStatementsController';
import { UpdateStatementsController } from '@modules/financial/useCases/statments/updateStatements/UpdateStatementsController';

const statementsRoutes = Router();

const createStatementController = new CreateStatementController();
const updateStatementsController = new UpdateStatementsController();
const lauchStatementController = new LauchStatementsController();
const deleteStatementsController = new DeleteStatementsController();
const listStatementsController = new ListStatementsController();

statementsRoutes.post('/', createStatementController.handle);
statementsRoutes.put('/', updateStatementsController.handle);
statementsRoutes.patch('/', lauchStatementController.handle);
statementsRoutes.delete('/ids/:ids', deleteStatementsController.handle);
statementsRoutes.get('/', listStatementsController.handle);

export { statementsRoutes };
