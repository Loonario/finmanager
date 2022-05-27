import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { StatsDto } from './dto/get-stats.dto';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
        @InjectRepository(Transaction)
        private transRepository: Repository<Transaction>,
      ) {}

      async catSum(statsDto: StatsDto){
        const {dateFrom, dateTo, categoryIds} = statsDto;
        const cats = await this.categoriesRepository.findByIds([...categoryIds]);

        const result = [];
        for (let i = 0; i < cats.length; i++){
            let cat = await this.categoriesRepository.find({
                relations: ['transactions'],
                where: {id: cats[i].id}
                })
            let catName = cat[0].name;
            let prof = cat[0].transactions.filter((tr) => tr.trType==="profitable");
            let consum = cat[0].transactions.filter((tr) => tr.trType==="consumable");
            let sumProf = prof.reduce((sum, item) => sum + item.amount, 0);
            let sumConsum = consum.reduce((sum, item) => sum + item.amount, 0);
            let total = sumProf - sumConsum;
            result.push(`${catName} : ${total}`);
        }

        //   const cats = await this.transRepository
        //     .createQueryBuilder('transaction')
        //     .leftJoinAndSelect("transaction.categories", "category")
        //     .where("category.id = :categoryId", {categoryId})
        //     .getMany()
    

          return {result};
        }
}
