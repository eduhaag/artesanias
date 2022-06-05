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

interface IStatementsFilterDTO {
  toFulfilled?: {
    from: Date;
    to: Date;
  };
  fulfilledOn?: {
    from: Date;
    to: Date;
  };
  description?: string;
  ledger?: number[];
  bankAccount?: number[];
}

export { IStatmentsDTO, IStatementsFilterDTO };
