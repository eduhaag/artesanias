import { Router } from 'express';

import { CreateCompositionController } from '@modules/products/useCases/compositions/createComposition/CreateCompositionController';
import { DeleteCompositionController } from '@modules/products/useCases/compositions/deleteComposition/DeleteCompositionController';
import { UpdateCompositionController } from '@modules/products/useCases/compositions/updateComposition/UpdateCompositionController';

const compositionRouter = Router();

const createCompositionController = new CreateCompositionController();
const deleteCompositionController = new DeleteCompositionController();
const updateCompositionController = new UpdateCompositionController();

compositionRouter.post('/', createCompositionController.handle);
compositionRouter.put('/', updateCompositionController.handle);
compositionRouter.delete('/:id', deleteCompositionController.handle);

export { compositionRouter };
