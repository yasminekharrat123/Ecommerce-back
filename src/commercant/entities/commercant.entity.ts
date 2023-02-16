import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'client', schema: 'public' })
export class commercant{

    @PrimaryGeneratedColumn()
    idCommercant: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'bytea', nullable: true })
    image: Buffer;

    @Column()
    serviceName: string;
}