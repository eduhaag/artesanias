import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleUseCase } from './CreateSaleUseCase';

class CreateSaleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      addition,
      city,
      client,
      complement,
      discount,
      district,
      number,
      observation,
      reference,
      shippingCoast,
      state,
      street,
      zipCode,
      products,
    } = req.body;

    const createSaleUseCase = container.resolve(CreateSaleUseCase);

    const sale = await createSaleUseCase.execute({
      client,
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      reference,
      observation,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      addition,
      discount,
      shippingCoast,
      products,
    });

    return res.json(sale);
  }
}

export { CreateSaleController };
