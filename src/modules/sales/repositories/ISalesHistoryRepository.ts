interface ISalesHistoryRepository {
  createHistory(saleId: number, history: string): Promise<void>;
}

export { ISalesHistoryRepository };
