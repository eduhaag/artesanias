import { Router } from 'express';

import { CreateProductCategoryController } from '@modules/products/useCases/categories/createProductCategory/CreateProductCategoryController';
import { DeleteProductCategoryController } from '@modules/products/useCases/categories/deleteProductCategory/DeleteProductCategoryController';
import { ListProductCategoriesController } from '@modules/products/useCases/categories/listProductCategories/ListProductCategoriesController';
import { UpdateProductCategoryController } from '@modules/products/useCases/categories/updateProductCategory/UpdateProductCategoryController';

const categoriesRoutes = Router();

const createProductCategoryController = new CreateProductCategoryController();
const listProductCategoryController = new ListProductCategoriesController();
const updateProductCategoryController = new UpdateProductCategoryController();
const deleteProductCategoryController = new DeleteProductCategoryController();

categoriesRoutes.post('/', createProductCategoryController.handle);

categoriesRoutes.get('/', listProductCategoryController.handle);

categoriesRoutes.put('/:id', updateProductCategoryController.handle);

categoriesRoutes.delete('/:id', deleteProductCategoryController.handle);

export { categoriesRoutes };
