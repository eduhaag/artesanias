import axios from 'axios';
import { injectable } from 'tsyringe';

@injectable()
class GetAddressByPostalCodeUseCase {
  async execute(cep: string): Promise<any> {
    const api = axios.create({
      baseURL: `https://viacep.com.br/ws/`,
    });

    const response = await api.get(`${cep}/json`);

    return response.data;
  }
}

export { GetAddressByPostalCodeUseCase };
