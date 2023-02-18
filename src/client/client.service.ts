import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddClientDto } from './dto/add-client-dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async addClient(client: AddClientDto): Promise<ClientEntity> {
    return await this.clientRepository.save(client);
  }

  async getClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async getClientById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Le client d'id ${id} n'existe pas`);
    }
    return client;
  }

  async SoftdeleteClient(id: number) {
    return await this.clientRepository.softDelete(id);
  }

  async restoreClient(id: number) {
    return await this.clientRepository.restore(id);
  }

  async updateClient(id: number, newClient: Partial<AddClientDto>) {
    const client = await this.getClientById(id);
    client.name = newClient.name ? newClient.name : client.name;
    client.image = newClient.image ? newClient.image : client.image;
    client.description = newClient.description
      ? newClient.description
      : client.description;

    this.clientRepository.save(client);

    return client;
  }
}
