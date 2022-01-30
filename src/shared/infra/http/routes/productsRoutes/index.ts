import { Router } from 'express';

import { categoriesRoutes } from '../categories.routes';
import { compositionRouter } from './compositions.routes';
import { picturesRouter } from './pictures.routes';
import { productsRouter } from './products.routes';

const productModuleRouter = Router();

productModuleRouter.use('/compositions', compositionRouter);
productModuleRouter.use('/categories', categoriesRoutes);
productModuleRouter.use('/images', picturesRouter);
productModuleRouter.use('/', productsRouter);

export { productModuleRouter };
