/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteStatementsUseCase {
  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository,
  ) {}

  async execute(statementsIds: string[]): Promise<void> {
    for await (const statementId of statementsIds) {
      const checkStatmentExists = await this.StatementsRepository.findById(
        statementId,
      );

      if (!checkStatmentExists) {
        throw new AppError(`Statement id ${statementId} does not found`);
      }
    }

    await this.StatementsRepository.deleteStatments(statementsIds);
  }
}

export { DeleteStatementsUseCase };
