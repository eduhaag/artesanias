/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class LauchStatementsUseCase {
  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository,
  ) {}

  async execute(
    statementsIds: string[],
    lauchDate: Date | null,
  ): Promise<void> {
    for await (const statementId of statementsIds) {
      const checkStatmentExists = await this.StatementsRepository.findById(
        statementId,
      );

      if (!checkStatmentExists) {
        throw new AppError(`Statement id ${statementId} does not found`);
      }
    }

    await this.StatementsRepository.lauchStatments(statementsIds, lauchDate);
  }
}

export { LauchStatementsUseCase };
