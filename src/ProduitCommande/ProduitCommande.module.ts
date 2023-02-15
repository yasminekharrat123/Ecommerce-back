import { CommandeModule } from './../Commande/commande.module';
import { ProduitModule } from './../produit/produit.module';
import { ProduitService } from './../produit/produit.service';
import { ProduitCommandeService } from './ProduitCommande.service';
import { ProduitCommandeEntity } from './entities/ProduitCommande.entity';
import { ProduitCommandeController } from './ProduitCommande.controller';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([ProduitCommandeEntity]),ProduitModule,CommandeModule],
  controllers: [ProduitCommandeController],
  providers: [ProduitCommandeService],
})
export class ProduitCommandeModule {}
