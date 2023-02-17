import { Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PanierService } from './panier.service';

@Controller('panier')
export class PanierController {
  constructor(private panierservice: PanierService) {}
  @Get()
  async getAllProduitsFromPanier(
    @Query('idClient', ParseIntPipe) idClient: number,
  ) {
    return this.panierservice.getAllProduitsPanierFromPanier(idClient);
  }

  @Post()
  async addToPanier(
    @Query('idClient', ParseIntPipe) idClient: number,
    @Query('idProduit', ParseIntPipe) idProduit: number,
    @Query('quantite', ParseIntPipe) quantite: number,
  ) {
    console.log('idClient:', idClient);
    console.log('idProduit:', idProduit);
    console.log('quantite:', quantite);
    return this.panierservice.addToPanier(idClient, idProduit, quantite);
  }
}
