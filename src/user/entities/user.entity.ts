import { ApiTags } from '@nestjs/swagger';
import { Bank } from 'src/bank/entities/bank.entity';
import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ApiTags('users')
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  hash: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // @OneToMany(() => Category, (category) => category.user)
  // categories: Category[];
  // @OneToMany(() => Bank, (bank) => bank.user)
  // banks: Bank[];
  // @OneToMany(() => Transaction, (transaction) => transaction.user)
  // transactions: Transaction[];
}
