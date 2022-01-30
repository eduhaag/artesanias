import { Router } from 'express';

import { CreateProductController } from '@modules/products/useCases/products/createProduct/CreateProductController';
import { DeleteProductController } from '@modules/products/useCases/products/deleteProduct/DeleteProductController';
import { GetProductByIdController } from '@modules/products/useCases/products/getProdutcById/GetProductByIdController';
import { ListAllProductsByTypeController } from '@modules/products/useCases/products/listAllProductsByType/ListAllProductsByTypeController';
import { ListAllProductsToSaleController } from '@modules/products/useCases/products/listAllProductsToSale/ListAllProductsToSaleController';
import { ListProductsByCategoryController } from '@modules/products/useCases/products/ListProductsByCatergory/ListProductsByCategoryController';
import { UpdateProductController } from '@modules/products/useCases/products/updateProduct/UpdateProductController';

const productsRouter = Router();

const createProductController = new CreateProductController();
const listAllProductsByTypeController = new ListAllProductsByTypeController();
const getProductByIdController = new GetProductByIdController();
const deleteProductController = new DeleteProductController();
const updateProductController = new UpdateProductController();
const listAllProductsToSaleController = new ListAllProductsToSaleController();
const listProductsByCategoryController = new ListProductsByCategoryController();

productsRouter.post('/', createProductController.handle);
productsRouter.put('/', updateProductController.handle);
productsRouter.get('/types', listAllProductsByTypeController.handle);
productsRouter.get('/tosale', listAllProductsToSaleController.handle);
productsRouter.get('/filter', listProductsByCategoryController.handle);
productsRouter.get('/:id', getProductByIdController.handle);
productsRouter.delete('/:id', deleteProductController.handle);

export { productsRouter };
