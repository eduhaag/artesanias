import { IInventoryMovimentDTO } from '../dtos/IIventoryMovimentDTO';
import { InventoryMoviment } from '../infra/typeorm/entities/InventoryMoviment';

interface IInventoryRepository {
  createInventoryMoviment(moviments: IInventoryMovimentDTO[]): Promise<void>;
  updateInvetoryMoviment({
    coast,
    materialId,
    quantity,
    type,
    history,
    id,
    purchaseId,
    saleId,
  }: IInventoryMovimentDTO): Promise<void>;
  getInventoryBySale(saleId: number): Promise<InventoryMoviment[]>;
}

export { IInventoryRepository };
