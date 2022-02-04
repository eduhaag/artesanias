import { IShippingMethodtsDTO } from '../dtos/IShippingMethosDTO';
import { ShippingMethod } from '../infra/typeorm/entities/ShippingMethod';

interface IShippingMethodsRepository {
  createShippingMethod({
    name,
    description,
  }: IShippingMethodtsDTO): Promise<ShippingMethod>;
  updateShippingMethod({
    id,
    name,
    description,
  }: IShippingMethodtsDTO): Promise<void>;
  deleteShippingMethod(id: number): Promise<void>;
  listAllShippingMethods(): Promise<ShippingMethod[]>;
  findShippingMethodByID(id: number): Promise<ShippingMethod>;
  findShippingMethodByName(name: string): Promise<ShippingMethod>;
}

export { IShippingMethodsRepository };
