import { ISaleStatusDTO } from '../dtos/ISaleStatusDTO';
import { SaleStatus } from '../infra/typeorm/entities/SaleStatus';

interface ISaleStatusRepository {
  createSaleStatus({
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<SaleStatus>;
  updateSaleStatus({
    id,
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<void>;
  deleteSaleStatus(id: number): Promise<void>;
  listSaleStatus(): Promise<SaleStatus[]>;
  findSaleStatusById(id: number): Promise<SaleStatus>;
  findSaleStatusByName(name: string): Promise<SaleStatus>;
}

export { ISaleStatusRepository };
