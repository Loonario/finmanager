import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { Bank } from '../../bank/entities/bank.entity';
  import { Category } from '../../category/entities/category.entity';
  
  export enum transactionType {
    PROFITABLE = 'profitable',
    CONSUMABLE = 'consumable',
  }

@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({
      type: 'enum',
      enum: transactionType,
      name: 'transaction_type'
    })
    trType: transactionType;
  
    @Column({
      type: 'numeric',
    })
    amount: number;
  
    @ManyToOne(() => Bank, (bank) => bank.transactions)
    @JoinColumn({
      name: 'bank_id',
    })
    bank: Bank;
  
    @OneToMany(() => Category, (category) => category.transaction)
    categories: Category[];
}
