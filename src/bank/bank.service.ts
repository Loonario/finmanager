import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Bank} from './entities/bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
  @InjectRepository(Bank)
  private banksRepository: Repository<Bank>
  ){}
  async create(createBankDto: CreateBankDto) {
 
    const newBank = await this.banksRepository.create(createBankDto);
    await this.banksRepository.save(newBank);
    return newBank;

    return 'This action adds a new bank';
  }

  findAll() {


    return `This action returns all bank`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bank`;
  }

  update(id: number, updateBankDto: UpdateBankDto) {
    return `This action updates a #${id} bank`;
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  }
}
