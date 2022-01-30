import { getRepository, Repository } from 'typeorm';

import { ICreateProductCategoryDTO } from '@modules/products/dtos/ICreateProductCategoryDTO';
import { IUpdateProductCategoryDTO } from '@modules/products/dtos/IUpdateProductCategoryDTO';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';

import { ProductCategory } from '../entities/ProductCategory';

class ProductCategoriesRepository implements IProductCategoriesRepository {
  private repository: Repository<ProductCategory>;

  constructor() {
    this.repository = getRepository(ProductCategory);
  }

  async update({
    id,
    name,
    description,
  }: IUpdateProductCategoryDTO): Promise<void> {
    await this.repository.update(id, { name, description });
  }

  async findById(id: number): Promise<ProductCategory> {
    const category = await this.repository.findOne({
      where: { id },
      relations: ['products'],
    });

    return category;
  }

  async create({
    name,
    description,
  }: ICreateProductCategoryDTO): Promise<ProductCategory> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<ProductCategory[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async findByName(name: string): Promise<ProductCategory> {
    const category = await this.repository.findOne({ name });

    return category;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { ProductCategoriesRepository };
