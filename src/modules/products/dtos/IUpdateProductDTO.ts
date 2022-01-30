interface IUpdateProductDTO {
  id: string;
  categoryId: number;
  name: string;
  description: string;
  coast: number;
  price: number;
  type: string;
  movesStock: boolean;
  toSale: boolean;
  observations: string;
}

export { IUpdateProductDTO };
