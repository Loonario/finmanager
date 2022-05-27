import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private banksRepository: Repository<Bank>,
  ) {}

  async create(CreateBankDto: CreateBankDto) {
    const newBank = this.banksRepository.create(CreateBankDto);
    await this.banksRepository.save(newBank);
    return newBank;
  }

  async findAll() {
    const allBanks = await this.banksRepository.find();
    if (allBanks.length === 0) {
      throw new HttpException(
        'Database of banks is empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return allBanks;
  }

  async findOne(id: string) {
    const newBank = await this.banksRepository.findOne(id, {relations: ['transactions']});
    if (!newBank) {
      throw new HttpException('Bank not found', HttpStatus.NOT_FOUND);
    }
    return newBank;
  }

  async update(id: string, updateBankDto: UpdateBankDto) {
    await this.banksRepository.update(id, updateBankDto);
    const updBank = await this.banksRepository.findOne(id);
    if (!updBank) {
      throw new HttpException('Bank not found', HttpStatus.NOT_FOUND);
    }
    return updBank;
  }

  async remove(id: string) {
    const delBank = await this.banksRepository.delete(id);
    if (!delBank.affected) {
      throw new HttpException('Bank not found', HttpStatus.NOT_FOUND);
    }
    return 'DELETED';
  }
}
