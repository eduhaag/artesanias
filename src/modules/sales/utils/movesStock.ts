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
          moviments[materialIndex].quantity +=
            product.quantity * material.quantity;
          moviments[materialIndex].coast +=
            product.quantity * material.quantity * material.material.coast;
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
}

export { MovesStock };
