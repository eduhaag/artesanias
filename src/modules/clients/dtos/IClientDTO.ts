import { Address } from '../infra/typeorm/entities/Address';

interface IClientDTO {
  id?: string;
  name: string;
  email?: string;
  taxCode?: string;
  phone?: string;
  birthday?: Date;
  acceptMarketing?: boolean;
  addresses?: Address[];
}

interface IChangePasswordDTO {
  id: string;
  newPassword: string;
  oldPassword: string;
}

interface IFilterDTO {
  email?: string;
  taxCode?: string;
}

export { IClientDTO, IChangePasswordDTO, IFilterDTO };
