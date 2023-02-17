import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { AddClientDto } from './dto/add-client-dto';
import { GetPaginatedClientDto } from './dto/get-paginated-client.dto';
import { client } from './entities/client.entity';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {
    this.clients = [];
  }
  clients: client[];

  @Get()
  getClient(@Query() mesQueryParams: GetPaginatedClientDto) {}

  @Post()
  addClientt(@Body() newClient: AddClientDto) {
    const Client = new client();
    const { name, password, description, image } = newClient;
    Client.name = name;
    Client.password = password;
    Client.description = description;
    Client.image = image;
    if (this.clients.length) {
      Client.idClient = this.clients[this.clients.length - 1].idClient + 1;
    } else {
      Client.idClient = 1;
    }
    this.clients.push(Client);
    return Client;
  }

  @Get('/:idClient')
  getClientById(@Param('idClient') idClient) {
    const client = this.clients.find(
      (actualClient) => actualClient.idClient === +idClient,
    );
    if (client) return client;
    else throw new NotFoundException(`le client d'id ${idClient} n'existe pas`);
  }

  @Post()
  addClient(@Body() newClient: client) {
    if (this.clients.length) {
      newClient.idClient = this.clients[this.clients.length - 1].idClient + 1;
    } else {
      newClient.idClient = 1;
    }
    this.clients.push(newClient);
    return newClient;
  }

  @Put(':idClient')
  updateClient(
    @Param('idClient') idClient,
    @Body() newClient: Partial<AddClientDto>,
  ) {
    const client = this.getClientById(idClient);
    client.name = newClient.name ? newClient.name : client.name;
    client.image = newClient.image ? newClient.image : client.image;
    client.description = newClient.description
      ? newClient.description
      : client.description;
    return client;
  }
}
