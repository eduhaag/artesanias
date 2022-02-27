import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';
import { Product } from '../infra/typeorm/entities/Product';

interface IFilter {
  name?: string;
  categoryId?: number;
  toSale?: boolean;
  types?: string[];
}

interface IProductsRepository {
  findByName(name: string): Promise<Product>;
  findById(id: string, relations?: string[]): Promise<Product>;
  createProduct(product: ICreateProductDTO): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(product: IUpdateProductDTO): Promise<void>;
  listProductsByFilter({
    name,
    categoryId,
    toSale,
    types,
  }: IFilter): Promise<Product[]>;
  getMaterialToInventory(productsIds: string[]): Promise<Product[]>;
}

export { IProductsRepository, IFilter };
