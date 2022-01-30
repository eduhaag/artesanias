import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetClientByTaxUseCase } from './GetClientByTaxUseCase';

class GetClientByTaxController {
  async handle(req: Request, res: Response): Promise<Response> {
    const taxCode = req.query.taxCode.toString();

    const getClientByTaxUseCase = container.resolve(GetClientByTaxUseCase);

    const client = await getClientByTaxUseCase.execute(taxCode);

    return res.json(client);
  }
}

export { GetClientByTaxController };
