interface ICreateCompositionDTO {
  materialId: string;
  quantity: number;
}

interface IUpdateComposition {
  id?: number;
  quantity: number;
}

export { ICreateCompositionDTO, IUpdateComposition };
