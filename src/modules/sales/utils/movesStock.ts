import { inject, injectable } from 'tsyringe';

import { IInventoryMovimentDTO } from '@modules/products/dtos/IIventoryMovimentDTO';
import { IInventoryRepository } from '@modules/products/repositories/IInventoryRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

import { SaleProduct } from '../infra/typeorm/entities/SaleProduct';

interface IMovesFromSale {
  saleId: number;
  products: SaleProduct[];
}

@injectable()
class MovesStock {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('InventoryRepository')
    private inventoryRepository: IInventoryRepository,
  ) {}

  async addStockMovimentsBySale({
    saleId,
    products,
  }: IMovesFromSale): Promise<void> {
    // Cria um array contendo os IDS dos produtos vendidos
    const productIds = products.map(product => {
      return product.productId;
    });

    // Busca os produtos com suas composições no banco de dados
    const productsWithCompositions =
      await this.productsRepository.getMaterialToInventory(productIds);

    // Busca movimentos ja existente desta venda
    const moviments: IInventoryMovimentDTO[] =
      await this.inventoryRepository.getInventoryBySale(saleId);

    // Faz um laço na lista de productos vendidos
    products.forEach(product => {
      // busca a composição do produto na lista retornada no banco
      const materials = productsWithCompositions.find(
        productWComposition => productWComposition.id === product.productId,
      ).composition;

      // faz um laço na lista de materiais, criando um objeto de movimento de stock
      materials.forEach(material => {
        // verifica de o material já existe na lista de materiais
        const materialIndex = moviments.findIndex(
          moviment => moviment.materialId === material.materialId,
        );

        if (materialIndex >= 0) {
          const lastQuantity = parseFloat(
            moviments[materialIndex].quantity.toString(),
          );

          const newquantity =
            parseFloat(product.quantity.toString()) *
            parseFloat(material.quantity.toString());

          moviments[materialIndex].quantity = lastQuantity + newquantity;

          const lastCoast = parseFloat(
            moviments[materialIndex].coast.toString(),
          );
          const newCoast = parseFloat(
            (
              product.quantity *
              material.quantity *
              material.material.coast
            ).toString(),
          );
          moviments[materialIndex].coast = lastCoast + newCoast;
        } else {
          const moviment = {
            materialId: material.materialId,
            saleId,
            type: 'S',
            quantity: product.quantity * material.quantity,
            coast:
              product.quantity * material.quantity * material.material.coast,
            history: `Consumido no pedido #${saleId}`,
          };
          moviments.push(moviment);
        }
      });
    });

    const newMoviments: IInventoryMovimentDTO[] = [];

    // Caso o movimento ja possui ID, é atualizado no banco, caso contrario
    // adiciona ao array newMoviments.
    // eslint-disable-next-line no-restricted-syntax
    for await (const moviment of moviments) {
      if (moviment.id) {
        this.inventoryRepository.updateInvetoryMoviment(moviment);
      } else {
        newMoviments.push(moviment);
      }
    }

    // salva os novos movimentos no banco
    this.inventoryRepository.createInventoryMoviment(newMoviments);
  }

  async removeStockMovimentBySaleProduct(
    saleId: number,
    product: SaleProduct,
  ): Promise<void> {
    // Busca o produto com suas composições no banco de dados
    const productsWithCompositions =
      await this.productsRepository.getMaterialToInventory([product.productId]);

    // separa a composição do produto
    const compositions = productsWithCompositions.map(item => {
      return item.composition;
    });

    // Busca movimentos ja existente desta venda
    const moviments: IInventoryMovimentDTO[] =
      await this.inventoryRepository.getInventoryBySale(saleId);

    compositions[0].forEach(composition => {
      const movimentIndex = moviments.findIndex(
        moviment => moviment.materialId === composition.materialId,
      );

      // se encontrou nos movimentos do pedido, faz o acerto
      if (movimentIndex >= 0) {
        // acerta quantidade
        const oldQuantity = parseFloat(
          moviments[movimentIndex].quantity.toString(),
        );
        const quantityToReduce = parseFloat(composition.quantity.toString());
        moviments[movimentIndex].quantity = oldQuantity - quantityToReduce;

        // acerta o custo
        const materialCoast = parseFloat(composition.material.coast.toString());
        const newCoast = moviments[movimentIndex].quantity * materialCoast;
        moviments[movimentIndex].coast = newCoast;
      }
    });

    // faz update nos movimentos no BD
    // eslint-disable-next-line no-restricted-syntax
    for await (const moviment of moviments) {
      if (moviment.quantity > 0) {
        this.inventoryRepository.updateInvetoryMoviment(moviment);
      } else {
        this.inventoryRepository.deleteMovimentInventory(moviment.id);
      }
    }
  }
}

export { MovesStock };
