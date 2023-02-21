import { UpdateClientDTO } from './dto/update-client.dto';
import { UserEntity } from './../user/entities/user.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Repository } from 'typeorm';

import { ClientEntity } from './entities/client.entity';
import pRetry from 'p-retry';
import { ProduitPanierEntity } from 'src/produit-panier/entities/produit-panier.entity';
import { CreateProduitPanierDto } from 'src/produit-panier/dto/create-produit-panier.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private ProduitRepository: Repository<ProduitEntity>,
    @InjectRepository(ProduitPanierEntity)
    private ProduitPanierRepository: Repository<ProduitPanierEntity>,
  ) {}
  async RegisterClient(user:UserEntity){
      const newClient =  {user};
      const client= await this.clientRepository.save(newClient);
     return {
        id:client.id,
        email:client.user.email,
        name:client.user.name
     }
  }


  async getClients(): Promise<ClientEntity[]> {
    return await this.clientRepository.find();
  }

  async getClientById(id: number): Promise<ClientEntity> {
    const client = await this.clientRepository.findOne({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Le client d'id ${id} n'existe pas`);
    }
    return client;
  }

  async SoftdeleteClient(id: number) {
    return await this.clientRepository.softDelete(id);
  }

  async restoreClient(id: number) {
    return await this.clientRepository.restore(id);
  }

  async updateClient(id: number, newClient: UpdateClientDTO) {
    const client = await this.getClientById(id);
    client.user.name = newClient.name ? newClient.name : client.user.name;
    client.image = newClient.image ? newClient.image : client.image;
    client.description = newClient.description
      ? newClient.description
      : client.description;

    this.clientRepository.save(client);

    return client;
  }

  async addtoPanier(
    clientId: number,
    produitId: number,
  ): Promise<ProduitPanierEntity[]> {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: ['Panier', 'Panier.produit'],
    });
    if (!client) {
      throw new NotFoundException(`Le client d'id ${clientId} n'existe pas`);
    }
    const produit = await this.ProduitRepository.findOne({
      where: { id: produitId },
      select: ['id', 'nom', 'image', 'description', 'prix', 'quantite'],
    });

    if (!produit) {
      throw new NotFoundException(`Le produit d'id ${produitId} n'existe pas`);
    }
    console.log('client.Panier:', client.Panier);
    console.log('produit.id:', produit.id);

    const index = client.Panier.findIndex((e) => {
      return e.produit && e.produit.id === (produit?.id ?? 'undefined');
    });
    if (index === -1) {
      const quantity = 1;
      const produitPanier = this.ProduitPanierRepository.create({
        client,
        produit,
        quantity,
      });
      await this.ProduitPanierRepository.save(produitPanier);
      client.Panier.push(produitPanier);
      await this.clientRepository.save(client);
    } else {
      client.Panier[index].quantity++;
      await this.ProduitPanierRepository.save(client.Panier[index]);
      await this.clientRepository.save(client);
    }

    return client.Panier;
  }
}
