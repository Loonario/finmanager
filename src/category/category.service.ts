import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll() {
    const allCategories = await this.categoryRepository.find();
    if (allCategories.length === 0) {
      throw new HttpException(
        'Database of banks is empty',
        HttpStatus.NOT_FOUND,
      );
    }
    return allCategories;
  }

  async findOne(id: number) {
    const newCategory = await this.categoryRepository.findOne(id);
    if (!newCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return newCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryRepository.update(id, updateCategoryDto);
    const updCategory = await this.categoryRepository.findOne(id);
    if (!updCategory) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return updCategory;
  }

  async remove(id: number) {
    const allCats = await this.categoryRepository.find();
    if(id <= 0 || id > allCats.length - 1){
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    const cat = await this.categoryRepository.findOne(id);
    const cats = await this.categoryRepository.find({
      relations: ['transactions'],
      where: { id: cat.id },
    });
    if(cats.length > 0){
      throw new HttpException('Category has transactions', HttpStatus.FORBIDDEN);
    }
    const delCategory = await this.categoryRepository.delete(id);
    if (!delCategory.affected) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return 'DELETED';
  }
}
