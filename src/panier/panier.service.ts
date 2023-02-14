import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Repository } from 'typeorm';
import { PanierEntity } from './entities/panier.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(PanierEntity)
    private panierRepository: Repository<PanierEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private readonly produitRepository: Repository<ProduitEntity>,
  ) {}

  async addToPanier(
    clientId: number,
    produitId: number,
  ): Promise<PanierEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier'],
    });
    const produit = await this.produitRepository.findOne({
      where: { id: produitId },
    });
    let Panier = client.panier;
    if (!Panier) {
      const Panier = new PanierEntity();
      Panier.client = client;
      Panier.produits = [produit];
    } else {
      Panier.produits.push(produit);
    }
    await this.panierRepository.save(Panier);
    client.panier = Panier;
    await this.clientRepository.save(client);

    return Panier;
  }

  async deleteFromPanier(
    clientId: number,
    produitId: number,
  ): Promise<PanierEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier'],
    });
    const produit = await this.produitRepository.findOne({
      where: { id: produitId },
    });
    let Panier = client.panier;
    if (!Panier) {
      throw new NotFoundException(`Le panier n'existe pas`);
    } else {
      Panier.produits.splice(Panier.produits.indexOf(produit), 1);
    }
    await this.panierRepository.save(Panier);
    client.panier = Panier;
    await this.clientRepository.save(client);
    return Panier;
  }

  async getAllProduitsFromPanier(clientId: number): Promise<ProduitEntity[]> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier'],
    });

    await this.panierRepository.find({
      where: { client: client },
      relations: ['produits'],
    });
    return client.panier.produits;
  }
}
