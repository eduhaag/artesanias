import { getRepository, Repository } from 'typeorm';

import { IUpdateComposition } from '@modules/products/dtos/ICreateComposition';
import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';

import { ProductComposition } from '../entities/ProductComposition';

class ProductCompositionsRepository implements IProductCompositionsRepository {
  private repository: Repository<ProductComposition>;

  constructor() {
    this.repository = getRepository(ProductComposition);
  }

  async deleteComposition(compositionId: number): Promise<void> {
    await this.repository.delete(compositionId);
  }

  async createComposition(
    data: ProductComposition[],
  ): Promise<ProductComposition[]> {
    const compositions = this.repository.create(data);

    await this.repository.save(compositions);

    return compositions;
  }

  async updateComposition({ id, quantity }: IUpdateComposition): Promise<void> {
    await this.repository.update(id, { quantity });
  }

  async getCompositionById(compositionId: number): Promise<ProductComposition> {
    const composition = await this.repository.findOne(compositionId);

    return composition;
  }

  async getCompositionByProductAndMaterial(
    productId: string,
    materialId: string,
  ): Promise<ProductComposition> {
    const composition = await this.repository.findOne({
      productId,
      materialId,
    });

    return composition;
  }
}

export { ProductCompositionsRepository };
