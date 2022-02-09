import { Router } from 'express';

import { CreateSaleChannelController } from '@modules/sales/useCases/SaleChannels/createSaleChannel/CreateSaleChannelController';
import { DeleteSaleChannelController } from '@modules/sales/useCases/SaleChannels/deleteSaleChannel/DeleteSaleChannelController';
import { ListSaleChannelsController } from '@modules/sales/useCases/SaleChannels/listSaleChannels/ListSaleChannelsController';
import { UpdateSaleChannelController } from '@modules/sales/useCases/SaleChannels/updateSaleChannel/UpdateSaleChannelController';

const saleChannelsRouter = Router();

const createSaleChannelController = new CreateSaleChannelController();
const updateSaleChannelController = new UpdateSaleChannelController();
const deleteSaleChannelController = new DeleteSaleChannelController();
const listSaleChannelsController = new ListSaleChannelsController();

saleChannelsRouter.post('/', createSaleChannelController.handle);
saleChannelsRouter.put('/', updateSaleChannelController.handle);
saleChannelsRouter.get('/', listSaleChannelsController.handle);
saleChannelsRouter.delete('/:id', deleteSaleChannelController.handle);

export { saleChannelsRouter };
