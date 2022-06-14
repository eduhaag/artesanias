import { getRepository, In, Repository } from 'typeorm';

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

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id },
      relations: ['category', 'pictures', 'inventory', 'composition'],
    });

    let stock = 0;

    if (product && product.inventory.length > 0) {
      stock = product.inventory.reduce((acc, moviment) => {
        const { quantity } = moviment;

        return acc + parseFloat(quantity.toString());
      }, 0);

      product.stock = stock;
    }

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
    const productsQuery = this.repository
      .createQueryBuilder('p')
      .leftJoin('p.inventory', 'i')
      .addSelect('SUM(i.quantity)', 'stock')
      .groupBy('p.id');

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

    const produtcts = await productsQuery.getRawMany();

    return produtcts;
  }

  async getMaterialToInventory(productsIds: string[]): Promise<Product[]> {
    const products = await this.repository.find({
      where: { id: In(productsIds) },
      relations: ['composition', 'composition.material'],
    });

    return products;
  }
}

export { ProductsRepository };
