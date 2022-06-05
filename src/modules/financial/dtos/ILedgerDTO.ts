interface ILedgerDTO {
  id?: number;
  groupId?: number;
  description?: string;
  type: 1 | -1;
}

export { ILedgerDTO };
