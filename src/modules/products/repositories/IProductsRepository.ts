import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';
import { Product } from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  findByName(name: string): Promise<Product>;
  findById(id: string, relations: string[]): Promise<Product>;
  createProduct(product: ICreateProductDTO): Promise<Product>;
  listAllByTypes(types: string[]): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  updateProduct(product: IUpdateProductDTO): Promise<void>;
  getAllProductsToSale(category?: string): Promise<Product[]>;
  listProductsByCategoryId(categoryId: number): Promise<Product[]>;
}

export { IProductsRepository };
