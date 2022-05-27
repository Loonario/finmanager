import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/bank/entities/bank.entity';
import { Category } from 'src/category/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PageOptionsDto } from './dto/page-options.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, transactionType } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Bank)
    private banksRepository: Repository<Bank>,

    @InjectRepository(Transaction)
    private transRepository: Repository<Transaction>,

    @InjectRepository(Category)
    private catRepository: Repository<Category>,
  ) {}

  async create(bankId: string, createTransactionDto: CreateTransactionDto) {
    const { trType, amount, categoryId } = createTransactionDto;
    const bank = await this.banksRepository.findOne(bankId);
    const category = await this.catRepository.findOne(categoryId);

    if (!bank && !category) {
      throw new HttpException(
        'Bank or Category not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const transaction = new Transaction();
    transaction.amount = amount;
    transaction.trType = trType;
    transaction.banks = [bank];
    transaction.categories = [category];
    await this.transRepository.save(transaction);

    if (trType === transactionType.PROFITABLE) {
      bank.balance += amount;
      console.log(bank.balance, amount);
      await this.banksRepository.save(bank);
    } else if (trType === transactionType.CONSUMABLE) {
      console.log(bank.balance, amount);
      bank.balance -= amount;
      await this.banksRepository.save(bank);
    }

    return transaction;
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const { take, page } = pageOptionsDto;

    const [result, total] = await this.transRepository.findAndCount({
      take: take,
      skip: page,
    });
    const pages = Math.floor(total / take);
    if (page > pages) {
      return 'Page not found';
    }
    return {
      data: result,
      count: total,
      pages: pages,
      'current page': page,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
