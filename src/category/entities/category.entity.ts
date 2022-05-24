import {
    Entity,
    BaseEntity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Transaction } from '../../transaction/entities/transaction.entity';
  
@Entity('category')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      unique: true,
    })
    name: string;
  
    @Column()
    balance: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => Transaction, (transaction) => transaction.categories)
    @JoinColumn({
      name: 'transaction_id',
    })
    transaction: Transaction;
}
