import { Module } from '@nestjs/common';
import { PanierService } from './panier.service';
import { PanierController } from './panier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanierEntity } from './entities/panier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PanierEntity])],
  providers: [PanierService],
  controllers: [PanierController],
})
export class PanierModule {}
