import { Router } from 'express';

import { CreateAddressController } from '@modules/clients/useCases/address/createAddress/CreateAddressController';
import { DeleteAddressController } from '@modules/clients/useCases/address/deleteAddress/DeleteAddressController';
import { UpdateAddressController } from '@modules/clients/useCases/address/updateAddress/UpdateAddressController';
import { ChangeClientPasswordController } from '@modules/clients/useCases/clients/changeClientPassword/ChangeClientPasswordController';
import { CreateClientControlle } from '@modules/clients/useCases/clients/createClient/CreateClientController';
import { GetClientByTaxController } from '@modules/clients/useCases/clients/getClientByTaxCode/GetClientByTaxController';
import { ListClientsController } from '@modules/clients/useCases/clients/listClients/ListClientsController';
import { UpdateClientController } from '@modules/clients/useCases/clients/updateClient/UpdateClientController';

const clientsRouter = Router();

// client
const createClientController = new CreateClientControlle();
const updateClientController = new UpdateClientController();
const changeClientPasswordController = new ChangeClientPasswordController();
const listClientsController = new ListClientsController();
const getClientByTaxCodeController = new GetClientByTaxController();

// address
const createAddressController = new CreateAddressController();
const deleteAddressController = new DeleteAddressController();
const updateAddressController = new UpdateAddressController();

clientsRouter.post('/', createClientController.handle);
clientsRouter.put('/', updateClientController.handle);
clientsRouter.patch('/password', changeClientPasswordController.handle);
clientsRouter.get('/', listClientsController.handle);
clientsRouter.get('/filter', getClientByTaxCodeController.handle);

clientsRouter.post('/addresses', createAddressController.handle);
clientsRouter.delete('/addresses/:id', deleteAddressController.handle);
clientsRouter.put('/addresses', updateAddressController.handle);

export { clientsRouter };
