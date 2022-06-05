import { IStatementsFilterDTO, IStatmentsDTO } from '../dtos/IStatmentsDTO';
import { Statement } from '../infra/typeorm/entities/Statement';

interface IStatementsRepository {
  createStatement({
    toFulfilled,
    fulfilledOn,
    bankAccountId,
    ledgerId,
    description,
    purchaseId,
    saleId,
    value,
  }: IStatmentsDTO): Promise<Statement>;
  updateStatement(statments: Statement[]): Promise<void>;
  deleteStatments(id: string[]): Promise<void>;
  listStatments({
    bankAccount,
    description,
    ledger,
    fulfilledOn,
    toFulfilled,
  }: IStatementsFilterDTO): Promise<Statement[]>;
  findById(id: string): Promise<Statement>;
  lauchStatments(ids: string[], lauchDate: Date | null): Promise<void>;
}

export { IStatementsRepository };
