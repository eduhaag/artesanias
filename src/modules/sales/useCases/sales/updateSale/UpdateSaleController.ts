import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSaleUseCase } from './UpdateSaleUseCase';

class UpdateSaleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      invoiceId,
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      addition,
      city,
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
      statusId,
    } = req.body;

    const updateSaleUseCase = container.resolve(UpdateSaleUseCase);

    await updateSaleUseCase.execute({
      id: id as number,
      invoiceId,
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      addition,
      city,
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
      statusId,
    });

    return res.send();
  }
}

export { UpdateSaleController };
