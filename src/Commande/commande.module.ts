import { CommandeEntity } from './entities/commande.entity';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([CommandeEntity])],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
