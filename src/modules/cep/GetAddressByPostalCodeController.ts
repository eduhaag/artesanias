import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAddressByPostalCodeUseCase } from './GetAddressByPostalCodeUseCase';

class GetAddressByPostalCodeController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { cep } = req.params;

    const getAddressByPostalCodeUseCase = container.resolve(
      GetAddressByPostalCodeUseCase,
    );

    const address = await getAddressByPostalCodeUseCase.execute(cep);

    return res.json(address);
  }
}

export { GetAddressByPostalCodeController };
