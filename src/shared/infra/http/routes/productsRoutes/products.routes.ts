import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/products/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/products/deleteProduct/DeleteProductController';
import { GetProductByIdController } from '@modules/products/useCases/products/getProdutcById/GetProductByIdController';
import { ListAllProductsWithFiltersController } from '@modules/products/useCases/products/listAllProductsWithFilter/ListAllProductsWithFilterController';
import { UpdateProductController } from '@modules/products/useCases/products/updateProduct/UpdateProductController';

const productsRouter = Router();

const createProductController = new CreateProductController();
const listAllProductsWithFiltersController =
  new ListAllProductsWithFiltersController();
const getProductByIdController = new GetProductByIdController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();

productsRouter.post('/', createProductController.handle);
productsRouter.put('/', updateProductController.handle);
productsRouter.get('/', listAllProductsWithFiltersController.handle);
productsRouter.get('/:id', getProductByIdController.handle);
productsRouter.delete('/:id', deleteProductController.handle);

export { productsRouter };
