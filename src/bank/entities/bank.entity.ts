import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity,
    OneToMany
  } from 'typeorm';
  import { Transaction } from '../../transaction/entities/transaction.entity';
  

@Entity('bank')

export class Bank extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({
        type: 'numeric'
    })
    balance: number;
  
    @Column({
        unique: true,
        length: 16
    })
    card_number: string;
  
    @CreateDateColumn({type: 'timestamptz', name: 'created_at'})
    createdAt: Date;
  
    @UpdateDateColumn({type: 'timestamptz', name: 'updated_at'})
    updatedAt: Date;
  
    @OneToMany(
        () => Transaction,
        transaction => transaction.bank
    )
    transactions: Transaction[]
}
