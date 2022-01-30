interface IAddressDTO {
  id?: number;
  clientId: string;
  destinatary: string;
  zipCode: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
  main: boolean;
}

interface IAddressUpdateDTO {
  id?: number;
  clientId: string;
  destinatary: string;
  zipCode: string;
  street: string;
  number: number;
  complement?: string;
  district: string;
  city: string;
  state: string;
  main: boolean;
}

export { IAddressDTO, IAddressUpdateDTO };
