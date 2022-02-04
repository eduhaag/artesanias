import { getRepository, Repository } from 'typeorm';

import { IBankAccountDTO } from '@modules/financial/dtos/IBankAccountDTO';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';

import { BankAccount } from '../entities/BankAccount';

class BankAccountsRepository implements IBankAccountsRepository {
  private repository: Repository<BankAccount>;

  constructor() {
    this.repository = getRepository(BankAccount);
  }

  async createBankAccount({
    name,
    startingBalance,
  }: IBankAccountDTO): Promise<BankAccount> {
    const account = this.repository.create({ name, startingBalance });

    await this.repository.save(account);

    return account;
  }

  async updateBankAccount({
    id,
    name,
    startingBalance,
  }: IBankAccountDTO): Promise<void> {
    await this.repository.update(id, { name, startingBalance });
  }

  async listAllBankAccounts(): Promise<BankAccount[]> {
    const accounts = await this.repository.find();

    return accounts;
  }

  async deleteBankAccount(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async getBankAccountById(id: number): Promise<BankAccount> {
    const account = await this.repository.findOne(id);

    return account;
  }

  async getBankAccountByName(accountName: string): Promise<BankAccount> {
    const account = await this.repository.findOne({
      where: { name: accountName },
    });

    return account;
  }
}

export { BankAccountsRepository };
