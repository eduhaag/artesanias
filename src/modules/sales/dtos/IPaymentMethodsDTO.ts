interface IPaymentMethodsDTO {
  id?: number;
  destinationAccount: number;
  name: string;
  description?: string;
  fixRate: number;
  variableRate: number;
  creditTime: number;
}

export { IPaymentMethodsDTO };
