// import { User } from 'src/user/entities/user.entity';
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
  ManyToMany,
  JoinTable,
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

  @Column()
  amount: number;

  @ManyToMany(() => Bank, (bank) => bank.id, {onDelete: "CASCADE"})
  @JoinTable({
    name: 'transactions_banks',
    joinColumn: {
      name: 'transaction',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'bank',
      referencedColumnName: 'id',
    },
  })
  banks: Bank[];

  @ManyToMany(() => Category, (category) => category.id, {onDelete: "CASCADE"})
  @JoinTable({
    name: 'transactions_categories',
    joinColumn: {
      name: 'transaction',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];


  // @ManyToOne(() => Bank, (bank) => bank.transactions)
  // @JoinColumn({
  //   name: 'bank_id',
  // })
  // bank: Bank;

  // @ManyToOne(() => User, (user) => user.transactions)
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // user: User;

  // @OneToMany(() => Category, (category) => category.transaction)
  // categories: Category[];
}
