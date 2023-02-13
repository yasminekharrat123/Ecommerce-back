import { Controller, ParseIntPipe } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators';
import { addProduitDto } from './dto/add-produit.dto';
import { ProduitEntity } from './entities/produit.entity/produit.entity';
import { ProduitService } from './produit.service';

@Controller('BuyerCatalog')
export class ProduitController {
  constructor(private produitservice: ProduitService) {}

  @Get()
  async getAllProduit(): Promise<ProduitEntity[]> {
    return this.produitservice.getAllProduit();
  }

  @Post()
  async addProduit(
    @Body() addProduitDto: addProduitDto,
  ): Promise<ProduitEntity> {
    return this.produitservice.addProduit(addProduitDto);
  }
  @Delete(':id')
  async removeProduit(@Param('id', ParseIntPipe) id: number) {
    return this.produitservice.removeProduit(id);
  }
  @Get(':id')
  async getProduit(@Param('id', ParseIntPipe) id): Promise<ProduitEntity> {
    return this.produitservice.findProduitById(id);
  }

  @Delete(':id')
  async deleteProduit(@Param('id', ParseIntPipe) id: number) {
    return this.produitservice.softDeleteProduit(id); //ou un tableau de criteres de produits
  }

  @Get('restore/:id')
  async recoverProduit(@Param('id', ParseIntPipe) id: number) {
    return this.produitservice.restoreProduit(id);
  }
}
