import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllProductsWithFiltersUseCase } from './ListAllProductsWithFiltersUseCase';

class ListAllProductsWithFiltersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, categoryId, toSale, types } = request.query;

    const listAllProductsWithFiltersUseCase = container.resolve(
      ListAllProductsWithFiltersUseCase,
    );

    let toSaleFilter;

    if (toSale) {
      if (toSale === 'true') {
        toSaleFilter = true;
      } else {
        toSaleFilter = false;
      }
    } else {
      toSaleFilter = undefined;
    }

    let typesToFilter;

    if (types) {
      if (Array.isArray(types)) {
        typesToFilter = types;
      } else {
        typesToFilter = [types];
      }
    } else {
      typesToFilter = undefined;
    }

    const products = await listAllProductsWithFiltersUseCase.execute({
      types: typesToFilter,
      name: name as string,
      categoryId: categoryId ? parseInt(categoryId.toString(), 10) : undefined,
      toSale: toSaleFilter,
    });

    return response.json(products);
  }
}

export { ListAllProductsWithFiltersController };
