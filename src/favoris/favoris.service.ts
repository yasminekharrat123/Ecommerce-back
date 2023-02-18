import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Repository } from 'typeorm';
import { FavorisEntity } from './entities/favoris.entity';

@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(FavorisEntity)
    private favorisRepository: Repository<FavorisEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private readonly produitRepository: Repository<ProduitEntity>,
  ) {}

  async addToFavoris(
    clientId: number,
    produitId: number,
  ): Promise<FavorisEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['favoris'],
    });
    if (!client) {
      throw new NotFoundException(`Le client n'existe pas`);
    }
    const produit = await this.produitRepository.findOne({
      where: { id: produitId },
    });
    if (!produit) {
      throw new NotFoundException(`Le produit n'existe pas`);
    }

    if (client.favoris.produits.includes(produit)) {
      throw new NotFoundException(`Le produit existe déjà`);
    }
    const Favoris = client.favoris;
    if (!Favoris) {
      const Favoris = await this.createFavoris(client);
      Favoris.produits = [produit];
      await this.favorisRepository.save(Favoris);
      client.favoris = Favoris;
    } else {
      Favoris.produits.push(produit);
      await this.favorisRepository.save(Favoris);
      client.favoris = Favoris;
    }

    await this.clientRepository.save(client);

    return Favoris;
  }

  async createFavoris(client: ClientEntity): Promise<FavorisEntity> {
    if (!client) {
      throw new NotFoundException(`Le client n'existe pas`);
    }
    const Favoris = new FavorisEntity();
    Favoris.produits = [];
    await this.favorisRepository.save(Favoris);
    client.favoris = Favoris;
    await this.clientRepository.save(client);
    return Favoris;
  }

  async deleteFromFavoris(
    clientId: number,
    produitId: number,
  ): Promise<FavorisEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['favoris', 'favoris.produits'],
    });

    console.log(clientId);
    console.log(produitId);

    let Favoris = client.favoris;
    if (!Favoris) {
      throw new NotFoundException(`Le favoris n'existe pas`);
    }
    console.log(`Favoris.produits: ${JSON.stringify(Favoris.produits)}`);

    const produit = Favoris.produits.find((p) => p.id === produitId);
    console.log(`produit: ${JSON.stringify(produit)}`);

    if (!produit) {
      throw new NotFoundException(`Le produit n'existe pas dans le favoris`);
    }

    Favoris.produits = Favoris.produits.filter((p) => p.id !== produitId);
    console.log(`Favoris.produits: ${JSON.stringify(Favoris.produits)}`);

    await this.favorisRepository.save(Favoris);

    client.favoris = Favoris;
    await this.clientRepository.save(client);
    return Favoris;
  }

  async getAllProduitsFromFavoris(clientId: number): Promise<ProduitEntity[]> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['favoris', 'favoris.produits'],
    });
    if (!client) {
      console.log(`Le client n'existe pas`);
      throw new NotFoundException(`Le client n'existe pas`);
    }

    return client.favoris.produits;
  }
}
