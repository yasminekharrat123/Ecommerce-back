import { CommandeModule } from './../Commande/commande.module';
import { ProduitModule } from './../produit/produit.module';
import { ProduitService } from './../produit/produit.service';
import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitCommandeEntity } from './entities/ProduitCommande.entity';
import { ProduitCommandeController } from './ProduitCommande.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddProduitCommandeDTO } from './dto/addPC.dto';


@Module({
  imports: [TypeOrmModule.forFeature([ProduitCommandeEntity])],
  controllers: [ProduitCommandeController],
  providers: [ProduitCommandeService],
  exports: [ProduitCommandeService]
})
export class ProduitCommandeModule {}
