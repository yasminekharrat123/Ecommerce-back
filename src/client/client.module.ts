import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitPanierEntity } from 'src/produit-panier/entities/produit-panier.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    TypeOrmModule.forFeature([ProduitEntity]),
    TypeOrmModule.forFeature([ProduitPanierEntity]),
  ],

  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
