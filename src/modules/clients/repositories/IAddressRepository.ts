import { IAddressDTO, IAddressUpdateDTO } from '../dtos/IAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

interface IAddressRepository {
  createAddress({
    clientId,
    destinatary,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    main,
  }: IAddressDTO): Promise<Address>;
  updateAddress({
    id,
    clientId,
    destinatary,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    main,
  }: IAddressUpdateDTO): Promise<void>;
  deleteAddress(id: number): Promise<void>;
  getMainAddressByClient(clientId: string): Promise<Address>;
  getAddressById(id: number): Promise<Address>;
}

export { IAddressRepository };
