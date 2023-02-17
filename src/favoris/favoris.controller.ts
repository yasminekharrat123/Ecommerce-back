import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { FavorisService } from './favoris.service';

@Controller('favoris')
export class FavorisController {
  constructor(private favorisservice: FavorisService) {}

  @Get()
  async getAllProduitsFromFavoris(
    @Query('idClient', ParseIntPipe) idClient: number,
  ) {
    return this.favorisservice.getAllProduitsFromFavoris(idClient);
  }

  @Post()
  async addToFavoris(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduit', ParseIntPipe) idProduit: number,
    @Req() req: Request,
  ) {
    console.log(req);
    console.log('idClient:', idClient);
    console.log('idProduit:', idProduit);
    return this.favorisservice.addToFavoris(idClient, idProduit);
  }

  @Delete()
  async deleteFromFavoris(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduit', ParseIntPipe) idProduit: number,
  ) {
    console.log('idClient:', idClient);
    console.log('idProduit:', idProduit);
    return this.favorisservice.deleteFromFavoris(idClient, idProduit);
  }
}
