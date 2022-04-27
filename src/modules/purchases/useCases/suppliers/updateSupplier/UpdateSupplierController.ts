import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSupplierUseCase } from '../createSupplier/CreateSupplierUseCase';

class UpdateSupplierController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, phone, taxCode } = req.body;

    const updateSupplierUseCase = container.resolve(UpdateSupplierUseCase);

    await updateSupplierUseCase.execute({
      id,
      name,
      email,
      phone,
      taxCode,
    });

    return res.status(204).send();
  }
}

export { UpdateSupplierController };
