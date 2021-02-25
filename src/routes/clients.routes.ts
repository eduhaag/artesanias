import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ClientsRepository from '../repositories/ClientsRepository';

import CreateClientService from '../services/CreateClientService';

const clientsRouter = Router();

clientsRouter.post('/', async (request, response) => {
  const clientData = request.body;

  const createClient = new CreateClientService();

  const clientSaved = await createClient.execute(clientData);

  return response.json(clientSaved);
});

clientsRouter.put('/', async (request, response) => {
  const {
    id,
    name,
    email,
    cpfCnpj,
    phone,
    birthday,
    acceptMarketing,
  } = request.body;

  const clientsRepository = getCustomRepository(ClientsRepository);

  const client = clientsRepository.update(id, {
    name,
    email,
    cpfCnpj,
    phone,
    birthday,
    acceptMarketing,
  });

  return response.json(client);
});

clientsRouter.get('/', async (request, response) => {
  const clientsRepository = getCustomRepository(ClientsRepository);

  const clients = await clientsRepository.find();

  return response.json(clients);
});

clientsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const clientsRepository = getCustomRepository(ClientsRepository);

  const client = await clientsRepository.findOne(id);

  return response.json(client);
});

clientsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const clientsRepository = getCustomRepository(ClientsRepository);

  await clientsRepository.delete(id);

  return response.status(200);
});

export default clientsRouter;
