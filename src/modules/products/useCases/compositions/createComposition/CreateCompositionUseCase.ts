/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import { ICreateCompositionDTO } from '@modules/products/dtos/ICreateComposition';
import { ProductComposition } from '@modules/products/infra/typeorm/entities/ProductComposition';
import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCompositionUseCase {
  constructor(
    @inject('ProductCompositionsRepository')
    private productCompositionsRepository: IProductCompositionsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(
    productId: string,
    materials: ICreateCompositionDTO[],
  ): Promise<ProductComposition[]> {
    const checkIfProductExists = await this.productsRepository.findById(
      productId,
      [],
    );

    if (!checkIfProductExists) {
      throw new AppError('Product does not found', 404);
    }

    if (materials.length === 0) {
      throw new AppError('The composition is required.', 400);
    }

    for (const { materialId } of materials) {
      const checkIfMaterialExist = await this.productsRepository.findById(
        materialId,
        [],
      );

      if (!checkIfMaterialExist) {
        throw new AppError(`Material ${materialId} not Exist`, 404);
      }

      const checkIfMaterialAlreadyExistsInProduct =
        await this.productCompositionsRepository.getCompositionByProductAndMaterial(
          productId,
          materialId,
        );

      if (checkIfMaterialAlreadyExistsInProduct) {
        throw new AppError(
          `Material ${materialId} already exists in the product composition. Try update the composition.`,
          400,
        );
      }
    }

    const compositions = materials.map(({ quantity, materialId }) => {
      const composition: ProductComposition = {
        materialId,
        productId,
        quantity,
      };

      return composition;
    });

    const response = await this.productCompositionsRepository.createComposition(
      compositions,
    );

    return response;
  }
}

export { CreateCompositionUseCase };
