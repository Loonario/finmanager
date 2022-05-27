import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { transactionType } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsEnum(transactionType)
  @IsNotEmpty()
  @ApiProperty({ enum: transactionType, example: transactionType.PROFITABLE })
  readonly trType: transactionType;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoryId: number;
}
