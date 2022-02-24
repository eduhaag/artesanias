import { container } from 'tsyringe';

import { ProductCategoriesRepository } from '@modules/products/infra/typeorm/repositories/ProductCategoriesRepository';
import { ProductCompositionsRepository } from '@modules/products/infra/typeorm/repositories/ProductCompositionsRepository';
import { ProductPicturesRepository } from '@modules/products/infra/typeorm/repositories/ProductPicturesRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';
import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

container.registerSingleton<IProductCategoriesRepository>(
  'ProductCategoriesRepository',
  ProductCategoriesRepository,
);

container.registerSingleton<IProductPicturesRepository>(
  'ProductPicturesRepository',
  ProductPicturesRepository,
);

container.registerSingleton<IProductCompositionsRepository>(
  'ProductCompositionsRepository',
  ProductCompositionsRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
