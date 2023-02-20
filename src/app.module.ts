import { ProduitCommandeModule } from './ProduitCommande/ProduitCommande.module';
import { CommandeModule } from './Commande/commande.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { CommercantModule } from './commercant/commercant.module';
import { ProduitModule } from './produit/produit.module';

import { FavorisModule } from './favoris/favoris.module';

import { ProduitPanierModule } from './produit-panier/produit-panier.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecommerce',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProduitModule,
    FavorisModule,
    ClientModule,
    CommercantModule,
    ProduitPanierModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
