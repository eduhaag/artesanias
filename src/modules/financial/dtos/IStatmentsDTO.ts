interface IStatmentsDTO {
  id?: string;
  saleId?: number;
  purchaseId?: string;
  ledgerId: number;
  bankAccountId: number;
  toFulfilled: Date;
  fulfilledOn?: Date;
  description: string;
  value: number;
}

export { IStatmentsDTO };
