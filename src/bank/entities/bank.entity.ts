import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('bank')
export class Bank extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    default: 0,
  })
  balance: number;

  @Column({
    unique: true,
    length: 16,
  })
  card_number: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Transaction, (transaction) => transaction.id)
  transactions: Transaction[];

//   @ManyToMany(() => Transaction)
//   @JoinTable({
//     name: 'banks_transactions',
//     joinColumn: {
//       name: 'bank',
//       referencedColumnName: 'id',
//     },
//     inverseJoinColumn: {
//       name: 'transaction',
//       referencedColumnName: 'id',
//     },
//   })
//   transactions: Transaction[];

  // @OneToMany(
  //     () => Transaction,
  //     transaction => transaction.bank
  // )
  // transactions: Transaction[]

  // @ManyToOne(() => User, (user) => user.banks)
  // @JoinColumn({
  //   name: 'user_id',
  // })
  // user: User;
}
