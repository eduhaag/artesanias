interface IInventoryMovimentDTO {
  id?: number;
  materialId: string;
  saleId?: number;
  purchaseId?: string;
  type: string;
  quantity: number;
  coast: number;
  history?: string;
}

export { IInventoryMovimentDTO };
