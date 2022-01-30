import { ICreateProductCategoryDTO } from '../dtos/ICreateProductCategoryDTO';
import { IUpdateProductCategoryDTO } from '../dtos/IUpdateProductCategoryDTO';
import { ProductCategory } from '../infra/typeorm/entities/ProductCategory';

interface IProductCategoriesRepository {
  findByName(name: string): Promise<ProductCategory>;
  list(): Promise<ProductCategory[]>;
  create({
    name,
    description,
  }: ICreateProductCategoryDTO): Promise<ProductCategory>;
  findById(id: number): Promise<ProductCategory>;
  update({ id, name, description }: IUpdateProductCategoryDTO): Promise<void>;
  delete(id: number): Promise<void>;
}

export { IProductCategoriesRepository };
