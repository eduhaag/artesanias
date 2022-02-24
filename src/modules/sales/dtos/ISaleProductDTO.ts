interface ISaleProductDTO {
  id?: number;
  saleId: string;
  productId: string;
  quantity: number;
  theme?: string;
  observations?: string;
  price: number;
  discount?: number;
}

export { ISaleProductDTO };
