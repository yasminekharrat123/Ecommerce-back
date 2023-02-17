import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanierEntity } from './entities/panier.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitPanierEntity } from './entities/produitPanier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PanierEntity]),
    TypeOrmModule.forFeature([ProduitEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
    TypeOrmModule.forFeature([ProduitPanierEntity]),
  ],
  providers: [PanierService],
  controllers: [PanierController],
})
export class PanierModule {}
