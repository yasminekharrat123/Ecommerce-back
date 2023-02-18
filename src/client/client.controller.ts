import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  NotFoundException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { AddClientDto } from './dto/add-client-dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients() {
    return this.clientService.getClients();
  }
  @Post()
  async addClient(@Body() AddClientDto: AddClientDto) {
    return this.clientService.addClient(AddClientDto);
  }

  @Get()
  getClientById(@Query('id', ParseIntPipe) id: number) {
    return this.clientService.getClientById(id);
  }

  @Put()
  async updateClient(
    @Query('id', ParseIntPipe) id: number,
    @Body() newClient: Partial<AddClientDto>,
  ) {
    return this.clientService.updateClient(id, newClient);
  }

  @Post('addtopanier')
  async addToPanier(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduit', ParseIntPipe) idProduit: number,
  ) {
    return this.clientService.addtoPanier(idClient, idProduit);
  }
}
