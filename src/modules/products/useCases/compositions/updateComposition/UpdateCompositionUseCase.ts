import { inject, injectable } from 'tsyringe';

import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateCompositionUseCase {
  constructor(
    @inject('ProductCompositionsRepository')
    private productCompositionsRepository: IProductCompositionsRepository,
  ) {}

  async execute(id: number, quantity: number): Promise<void> {
    const checkIfCompositionExists =
      await this.productCompositionsRepository.getCompositionById(id);

    if (!checkIfCompositionExists) {
      throw new AppError('Composition not found', 404);
    }

    await this.productCompositionsRepository.updateComposition({
      id,
      quantity,
    });
  }
}

export { UpdateCompositionUseCase };
