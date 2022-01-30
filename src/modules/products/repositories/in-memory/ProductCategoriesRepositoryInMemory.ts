import { ICreateProductCategoryDTO } from '@modules/products/dtos/ICreateProductCategoryDTO';
import { IUpdateProductCategoryDTO } from '@modules/products/dtos/IUpdateProductCategoryDTO';
import { ProductCategory } from '@modules/products/infra/typeorm/entities/ProductCategory';

import { IProductCategoriesRepository } from '../IProductCategoriesRepository';

class ProductCategoriesRepositoryInMemory
  implements IProductCategoriesRepository
{
  productCategories: ProductCategory[] = [];

  async findByName(name: string): Promise<ProductCategory> {
    const category = this.productCategories.find(
      category => category.name === name,
    );

    return category;
  }

  async list(): Promise<ProductCategory[]> {
    return this.productCategories;
  }

  async create({
    name,
    description,
  }: ICreateProductCategoryDTO): Promise<ProductCategory> {
    const category = new ProductCategory();

    Object.assign(category, {
      id: 13,
      name,
      description,
    });

    this.productCategories.push(category);

    return category;
  }

  async findById(id: number): Promise<ProductCategory> {
    const category = this.productCategories.find(
      category => category.id === id,
    );

    return category;
  }

  async update({
    id,
    name,
    description,
  }: IUpdateProductCategoryDTO): Promise<void> {
    const categoryIndex = this.productCategories.findIndex(
      category => category.id === id,
    );

    this.productCategories[categoryIndex].name = name;
    this.productCategories[categoryIndex].description = description;
    this.productCategories[categoryIndex].updated_at = new Date();
  }

  async delete(id: number): Promise<void> {
    const categoryIndex = this.productCategories.findIndex(
      category => category.id === id,
    );

    this.productCategories.splice(categoryIndex, 1);
  }
}

export { ProductCategoriesRepositoryInMemory };
