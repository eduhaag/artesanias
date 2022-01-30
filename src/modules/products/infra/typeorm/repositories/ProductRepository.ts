import { getRepository, Repository, In } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async listAllByTypes(types: string[]): Promise<Product[]> {
    const products = await this.repository.find({
      where: {
        type: In(types),
      },
    });

    return products;
  }

  async createProduct({
    categoryId,
    observations,
    coast,
    movesStock,
    description,
    name,
    toSale,
    type,
    price,
    composition,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      categoryId,
      coast,
      description,
      movesStock,
      name,
      observations,
      price,
      toSale,
      type,
      composition,
    });

    await this.repository.save(product);

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({ name });

    return product;
  }

  async findById(id: string, relation: string[]): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: relation,
    });

    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async updateProduct({
    id,
    type,
    name,
    coast,
    categoryId,
    movesStock,
    observations,
    price,
    toSale,
  }: IUpdateProductDTO): Promise<void> {
    await this.repository.update(id, {
      type,
      name,
      coast,
      categoryId,
      movesStock,
      observations,
      price,
      toSale,
    });
  }

  async getAllProductsToSale(category: string): Promise<Product[]> {
    let products;

    if (category) {
      products = await this.repository.find({
        where: { categoryId: category, toSale: true },
        relations: ['pictures', 'category'],
      });
    } else {
      products = await this.repository.find({
        where: { toSale: true },
        relations: ['pictures', 'category'],
      });
    }

    return products;
  }

  async listProductsByCategoryId(categoryId: number): Promise<Product[]> {
    const products = await this.repository.find({
      where: { categoryId },
      relations: ['category', 'pictures'],
    });

    return products;
  }
}

export { ProductsRepository };
