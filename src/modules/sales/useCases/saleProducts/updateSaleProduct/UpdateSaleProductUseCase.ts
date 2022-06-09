import { container, inject, injectable } from 'tsyringe';

import { ISaleProductDTO } from '@modules/sales/dtos/ISaleProductDTO';
import { SaleProduct } from '@modules/sales/infra/typeorm/entities/SaleProduct';
import { ISaleProductsRepository } from '@modules/sales/repositories/ISaleProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { MovesStock } from '@utils/movesStock';

@injectable()
class UpdateSaleProductUseCase {
  constructor(
    @inject('SaleProductsRepository')
    private SaleProductsRepository: ISaleProductsRepository,
  ) {}

  async execute({
    price,
    quantity,
    discount,
    id,
    observations,
    theme,
  }: ISaleProductDTO): Promise<void> {
    const checkSaleProductExist = await this.SaleProductsRepository.findById(
      id,
    );

    if (!checkSaleProductExist) {
      throw new AppError('Sale product does not found.', 404);
    }

    const newSaleProduct: SaleProduct = {
      price,
      saleId: checkSaleProductExist.saleId,
      productId: checkSaleProductExist.productId,
      quantity,
      discount,
      observations,
      theme,
      id,
    };

    await this.SaleProductsRepository.updateSaleProduct(newSaleProduct);

    const movesStock = container.resolve(MovesStock);

    if (quantity < checkSaleProductExist.quantity) {
      // passa apenas a difereça para o movimento
      newSaleProduct.quantity = checkSaleProductExist.quantity - quantity;
      await movesStock.removeStockMovimentBySaleProduct(
        checkSaleProductExist.saleId,
        newSaleProduct,
      );
    } else if (quantity > checkSaleProductExist.quantity) {
      // passa apenas a difereça para o movimento
      newSaleProduct.quantity = quantity - checkSaleProductExist.quantity;
      await movesStock.addStockMovimentsBySale({
        saleId: checkSaleProductExist.saleId,
        products: [newSaleProduct],
      });
    }
  }
}

export { UpdateSaleProductUseCase };
