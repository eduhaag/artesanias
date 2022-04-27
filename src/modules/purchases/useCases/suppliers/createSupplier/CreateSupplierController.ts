import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSupplierUseCase } from './CreateSupplierUseCase';

class CreateSupplierController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, phone, taxCode } = req.body;

    const createSupplierUseCase = container.resolve(CreateSupplierUseCase);

    const supplier = await createSupplierUseCase.execute({
      name,
      email,
      phone,
      taxCode,
    });

    return res.json(supplier).send();
  }
}

export { CreateSupplierController };
