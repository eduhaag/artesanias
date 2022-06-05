import { ILedgerDTO } from '../dtos/ILedgerDTO';
import { Ledger } from '../infra/typeorm/entities/Ledger';

interface ILedgersRepository {
  createLedger({ type, description, groupId }: ILedgerDTO): Promise<Ledger>;
  updateLedger({ id, type, description, groupId }: ILedgerDTO): Promise<void>;
  listLedgers(type?: 1 | -1): Promise<Ledger[]>;
  deleteLedger(id: number): Promise<void>;
  findById(id: number): Promise<Ledger>;
  findByDescription(description: string): Promise<Ledger>;
}

export { ILedgersRepository };
