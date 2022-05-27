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

  async catSum(statsDto: StatsDto) {
    const { dateFrom, dateTo, categoryIds } = statsDto;
    const cats = await this.categoriesRepository.findByIds([...categoryIds]);

    const result = [];

    for (let i = 0; i < cats.length; i++) {
      let cat = await this.categoriesRepository.find({
        relations: ['transactions'],
        where: { id: cats[i].id },
      });
      const catName = cat[0].name;
      if (dateFrom || dateTo) {
        let trFiltered = dateFilter(cat[0].transactions);
        let trSum = getSum(trFiltered);
        result.push(`${catName} : ${trSum}`);
      } else {
        const trSum = getSum(cat[0].transactions);
        result.push(`${catName} : ${trSum}`);
      }
    }

    function dateFilter(trArray: Array<Transaction>) {
      if (dateFrom && dateTo) {
        return trArray.filter(
          (tr) =>
            tr.created_at < new Date(dateTo) &&
            tr.created_at > new Date(dateFrom),
        );
      } else if (!dateFrom && dateTo) {
        return trArray.filter((tr) => tr.created_at < new Date(dateTo));
      } else if (dateFrom && !dateTo) {
        return trArray.filter((tr) => tr.created_at > new Date(dateFrom));
      }
    }

    function getSum(transToSum: Array<Transaction>) {
      let prof = transToSum.filter((tr) => tr.trType === 'profitable');
      let consum = transToSum.filter((tr) => tr.trType === 'consumable');
      let sumProf = prof.reduce((sum, item) => sum + item.amount, 0);
      let sumConsum = consum.reduce((sum, item) => sum + item.amount, 0);
      return sumProf - sumConsum;
    }

    //   const cats = await this.transRepository
    //     .createQueryBuilder('transaction')
    //     .leftJoinAndSelect("transaction.categories", "category")
    //     .where("category.id = :categoryId", {categoryId})
    //     .getMany()

    return { result };
  }
}
