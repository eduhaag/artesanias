interface ISaleProductDTO {
  id?: number;
  saleId?: number;
  productId?: string;
  quantity: number;
  theme?: string;
  observations?: string;
  price: number;
  discount?: number;
}

export { ISaleProductDTO };
