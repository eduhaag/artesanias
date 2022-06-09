interface IPurchaseProductDTO {
  id?: number;
  purchaseId?: string;
  productId?: string;
  quantity: number;
  reference?: string;
  price: number;
}

export { IPurchaseProductDTO };
