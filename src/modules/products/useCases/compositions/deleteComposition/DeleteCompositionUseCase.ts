import { inject, injectable } from 'tsyringe';

import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteCompositionUseCase {
  constructor(
    @inject('ProductCompositionsRepository')
    private productCompositionsRepository: IProductCompositionsRepository,
  ) {}

  async execute(CompositionId: number): Promise<void> {
    const checkIfCompositionExists =
      await this.productCompositionsRepository.getCompositionById(
        CompositionId,
      );

    if (!checkIfCompositionExists) {
      throw new AppError('Composition not found', 404);
    }

    await this.productCompositionsRepository.deleteComposition(CompositionId);
  }
}

export { DeleteCompositionUseCase };
