import { IUpdateComposition } from '../dtos/ICreateComposition';
import { ProductComposition } from '../infra/typeorm/entities/ProductComposition';

interface IProductCompositionsRepository {
  createComposition(
    compositions: ProductComposition[],
  ): Promise<ProductComposition[]>;
  updateComposition(composition: IUpdateComposition): Promise<void>;
  deleteComposition(compositionId: number): Promise<void>;
  getCompositionByProductAndMaterial(
    productId: string,
    materialId: string,
  ): Promise<ProductComposition>;
  getCompositionById(compositionId: number): Promise<ProductComposition>;
}

export { IProductCompositionsRepository };
