interface IInventoryMovimentDTO {
  id?: number;
  materialId: string;
  saleId?: number;
  purchaseId?: number;
  type: string;
  quantity: number;
  coast: number;
  history?: string;
}

export { IInventoryMovimentDTO };
