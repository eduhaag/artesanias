import { IBankAccountDTO } from '../dtos/IBankAccountDTO';
import { BankAccount } from '../infra/typeorm/entities/BankAccount';

interface IBankAccountsRepository {
  createBankAccount({
    name,
    startingBalance,
  }: IBankAccountDTO): Promise<BankAccount>;
  updateBankAccount({
    id,
    name,
    startingBalance,
  }: IBankAccountDTO): Promise<void>;
  listAllBankAccounts(): Promise<BankAccount[]>;
  deleteBankAccount(id: number): Promise<void>;
  getBankAccountById(id: number): Promise<BankAccount>;
  getBankAccountByName(accoutName: string): Promise<BankAccount>;
}

export { IBankAccountsRepository };
