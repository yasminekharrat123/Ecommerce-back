import { UpdateClientDTO } from './dto/update-client.dto';
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


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getAllClients() {
    return this.clientService.getClients();
  }

  @Get()
  getClientById(@Query('id', ParseIntPipe) id: number) {
    return this.clientService.getClientById(id);
  }

  @Put()
  async updateClient(
    @Query('id', ParseIntPipe) id: number,
    @Body() newClient: UpdateClientDTO,
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
