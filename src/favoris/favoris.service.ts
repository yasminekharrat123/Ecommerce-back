import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    const produit = await this.produitRepository.findOne({
      where: { id: produitId },
    });
    let Favoris = client.favoris;
    if (!Favoris) {
      const Favoris = new FavorisEntity();
      Favoris.client = client;
      Favoris.produits = [produit];
    } else {
      Favoris.produits.push(produit);
    }
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
      relations: ['favoris'],
    });
    const produit = await this.produitRepository.findOne({
      where: { id: produitId },
    });
    let Favoris = client.favoris;
    if (!Favoris) {
      throw new NotFoundException(`Le favoris n'existe pas`);
    } else {
      Favoris.produits.splice(Favoris.produits.indexOf(produit), 1);
    }
    await this.favorisRepository.save(Favoris);
    client.favoris = Favoris;
    await this.clientRepository.save(client);
    return Favoris;
  }

  async getAllProduitsFromFavoris(clientId: number): Promise<ProduitEntity[]> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['favoris'],
    });

    await this.favorisRepository.find({
      where: { client: client },
      relations: ['produits'],
    });
    return client.favoris.produits;
  }
}
