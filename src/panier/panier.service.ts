import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { PanierEntity } from './entities/panier.entity';
import { ProduitPanierEntity } from './entities/produitPanier.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(PanierEntity)
    private panierRepository: Repository<PanierEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private readonly produitRepository: Repository<ProduitEntity>,
    @InjectRepository(ProduitPanierEntity)
    private readonly produitPanierRepository: Repository<ProduitPanierEntity>,
  ) {}

  async createPanier(client: ClientEntity): Promise<PanierEntity> {
    if (!client) {
      throw new NotFoundException(`Le client n'existe pas`);
    }

    const Panier = new PanierEntity();
    Panier.produitsPanier = [];
    await this.panierRepository.save(Panier);
    client.panier = Panier;
    await this.clientRepository.save(client);
    return Panier;
  }

  async createProduitPanier(
    produit: ProduitEntity,
    quantite: number,
  ): Promise<ProduitPanierEntity> {
    if (!produit) {
      console.log(`produit: ${JSON.stringify(produit)}`);

      throw new NotFoundException(`Le produit n'existe pas`);
    }

    const ProduitPanier = new ProduitPanierEntity();
    ProduitPanier.produit = produit;
    ProduitPanier.quantite = quantite;

    await this.produitPanierRepository.save(ProduitPanier);
    return ProduitPanier;
  }

  async addToPanier(
    clientId: number,
    produitId: number,
    quantiteAjoutee: number,
  ): Promise<PanierEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier', 'panier.produitsPanier'],
    });
    if (!client) {
      throw new NotFoundException(`Le client n'existe pas`);
    }

    const produit1 = await this.produitRepository.findOne({
      where: { id: produitId },
      select: ['id'],
    });

    if (!produit1) {
      throw new NotFoundException(`Le produit n'existe pas`);
    }
    console.log(`produit: ${JSON.stringify(produit1)}`);
    let panier = client.panier;

    if (!panier) {
      panier = await this.createPanier(client);
      await this.panierRepository.save(panier);
      client.panier = panier;
      await this.clientRepository.save(client);
    }
    console.log(
      `panier.produitsPanier: ${JSON.stringify(panier.produitsPanier)}`,
    );
    const ProduitExistant = panier.produitsPanier.find(
      (p) => p.produit && p.produit.id === produitId,
    );

    if (ProduitExistant) {
      ProduitExistant.quantite += quantiteAjoutee;
      await this.produitPanierRepository.save(ProduitExistant);
    } else {
      panier.produitsPanier.push(
        await this.createProduitPanier(produit1, quantiteAjoutee),
      );
    }

    await this.panierRepository.save(panier);
    return client.panier;
  }

  /*

  async deleteFromPanier(
    clientId: number,
    produitId: number,
  ): Promise<PanierEntity> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier', 'panier.produits'],
    });

    console.log(clientId);
    console.log(produitId);

    let Panier = client.panier;
    if (!Panier) {
      throw new NotFoundException(`Le panier n'existe pas`);
    }
    console.log(`Panier.produits: ${JSON.stringify(Panier.produitsPanier)}`);

    const produit = Panier.produitsPanier.find((p) => p.id === produitId);
    console.log(`produit: ${JSON.stringify(produit)}`);

    if (!produit) {
      throw new NotFoundException(`Le produit n'existe pas dans le panier`);
    }

    Panier.produitsPanier = Panier.produitsPanier.filter((p) => p.id !== produitId);
    console.log(`Panier.produits: ${JSON.stringify(Panier.produitsPanier)}`);

    await this.panierRepository.save(Panier);

    client.panier = Panier;
    await this.clientRepository.save(client);
    return Panier;
  }
*/
  async getAllProduitsPanierFromPanier(
    clientId: number,
  ): Promise<ProduitPanierEntity[]> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['panier', 'panier.produitsPanier'],
    });
    if (!client) {
      console.log(`Le client n'existe pas`);
      throw new NotFoundException(`Le client n'existe pas`);
    }

    return client.panier.produitsPanier;
  }
}
