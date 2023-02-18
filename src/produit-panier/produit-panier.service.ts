import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from 'src/produit/entities/produit.entity/produit.entity';
import { Repository } from 'typeorm';
import { CreateProduitPanierDto } from './dto/create-produit-panier.dto';
import { UpdateProduitPanierDto } from './dto/update-produit-panier.dto';
import { ProduitPanierEntity } from './entities/produit-panier.entity';

@Injectable()
export class ProduitPanierService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private ProduitRepository: Repository<ProduitEntity>,
    @InjectRepository(ProduitEntity)
    private ProduitPanierRepository: Repository<ProduitPanierEntity>,
  ) {}

  async createProduitPanier(
    client: ClientEntity,
    produit: ProduitEntity,
    quantity: number,
  ) {
    const produitPanier = this.ProduitPanierRepository.create({
      client,
      produit,
      quantity,
    });
    return this.ProduitPanierRepository.save(produitPanier);
  }

  findAll() {
    return `This action returns all produitPanier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produitPanier`;
  }

  update(id: number, updateProduitPanierDto: UpdateProduitPanierDto) {
    return `This action updates a #${id} produitPanier`;
  }

  remove(id: number) {
    return `This action removes a #${id} produitPanier`;
  }
}
