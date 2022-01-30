import { ProductComposition } from '../infra/typeorm/entities/ProductComposition';

interface ICreateProductDTO {
  categoryId: number;
  name: string;
  description: string;
  coast: number;
  price: number;
  type: string;
  movesStock: boolean;
  toSale: boolean;
  observations: string;
  composition?: ProductComposition[];
}

export { ICreateProductDTO };
