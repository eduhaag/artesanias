import { inject, injectable } from 'tsyringe';

import { IInventoryMovimentDTO } from '@modules/products/dtos/IIventoryMovimentDTO';
import { IInventoryRepository } from '@modules/products/repositories/IInventoryRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequestData {
  materialId: string;
  quantity: number;
}

@injectable()
class UpdateInventoryByMaterialArrayUseCase {
  constructor(
    @inject('InventoryRepository')
    private InventoryRepository: IInventoryRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(request: IRequestData[]): Promise<void> {
    const inventoryToMoviment: IInventoryMovimentDTO[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const material of request) {
      const { materialId, quantity } = material;
      const checkMaterialExists = await this.productsRepository.findById(
        materialId,
      );

      if (!checkMaterialExists) {
        throw new AppError(`Material ID #${materialId} does not found`);
      }

      if (checkMaterialExists.movesStock && quantity !== 0) {
        inventoryToMoviment.push({
          materialId,
          quantity,
          coast: quantity * checkMaterialExists.coast,
          type: quantity > 0 ? 'E' : 'S',
          history: 'Movimentação Manual',
        });
      }
    }

    if (inventoryToMoviment.length > 0) {
      await this.InventoryRepository.updateInventoryByMaterialArray(
        inventoryToMoviment,
      );
    }
  }
}

export { UpdateInventoryByMaterialArrayUseCase };
