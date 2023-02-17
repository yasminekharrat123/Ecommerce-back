import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavorisEntity } from './entities/favoris.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavorisEntity]),
    TypeOrmModule.forFeature([ProduitEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  providers: [FavorisService],
  controllers: [FavorisController],
})
export class FavorisModule {}
