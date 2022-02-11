import { getRepository, Repository } from 'typeorm';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO';
import {
  IProductsRepository,
  IFilter,
} from '@modules/products/repositories/IProductsRepository';

import { Product } from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
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

  async findById(id: string, relation?: string[]): Promise<Product> {
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

  async listProductsByFilter({
    name,
    categoryId,
    toSale,
    types,
  }: IFilter): Promise<Product[]> {
    const productsQuery = this.repository.createQueryBuilder('p');

    if (name) {
      productsQuery.andWhere('p.name like :nameL', {
        nameL: `%${name}%`,
      });
    }

    if (categoryId) {
      productsQuery.andWhere('p.category_id = :category', {
        category: categoryId,
      });
    }

    if (toSale !== undefined) {
      productsQuery.andWhere('p.to_sale = :toSale', { toSale });
    }

    if (types) {
      productsQuery.andWhere('p.type IN(:...types)', { types });
    }

    const produtcts = await productsQuery.getMany();

    return produtcts;
  }
}

export { ProductsRepository };
