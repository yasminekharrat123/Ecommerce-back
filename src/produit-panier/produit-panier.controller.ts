import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProduitPanierService } from './produit-panier.service';
import { CreateProduitPanierDto } from './dto/create-produit-panier.dto';
import { UpdateProduitPanierDto } from './dto/update-produit-panier.dto';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';

@Controller('produit-panier')
export class ProduitPanierController {
  constructor(private readonly produitPanierService: ProduitPanierService) {}

  @Post()
  createProduitPanier(
    Client: ClientEntity,
    Produit: ProduitEntity,
    quantity: number,
  ) {
    return this.produitPanierService.createProduitPanier(
      Client,
      Produit,
      quantity,
    );
  }

  @Get()
  findAll() {
    return this.produitPanierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitPanierService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduitPanierDto: UpdateProduitPanierDto,
  ) {
    return this.produitPanierService.update(+id, updateProduitPanierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitPanierService.remove(+id);
  }
}
