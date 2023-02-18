import { Module } from '@nestjs/common';
import { ProduitPanierService } from './produit-panier.service';
import { ProduitPanierController } from './produit-panier.controller';
import { ProduitPanierEntity } from './entities/produit-panier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProduitPanierEntity]),
    TypeOrmModule.forFeature([ProduitEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  controllers: [ProduitPanierController],
  providers: [ProduitPanierService],
})
export class ProduitPanierModule {}
