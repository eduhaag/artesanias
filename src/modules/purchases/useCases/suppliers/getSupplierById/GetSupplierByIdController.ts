import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetSupplierByIdUseCase } from './GetSupplierByIdUseCase';

class GetSupplierByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getSupplierByIdUseCase = container.resolve(GetSupplierByIdUseCase);

    const supplier = await getSupplierByIdUseCase.execute(id);

    return res.json(supplier).send();
  }
}

export { GetSupplierByIdController };
