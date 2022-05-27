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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Transaction, transactionType } from '../../transaction/entities/transaction.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Transaction, (transaction) => transaction.id, {onDelete: "CASCADE"})
  @JoinTable({
    name: 'transactions_categories',
    joinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'transaction',
      referencedColumnName: 'id',
    },
  })
  transactions: Transaction[];

  // @ManyToOne(() => User, (user) => user.transactions)
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // user: User;

  // @ManyToOne(() => Transaction, (transaction) => transaction.categories)
  // @JoinColumn({
  //   name: 'transaction_id',
  // })
  // transaction: Transaction;
}
