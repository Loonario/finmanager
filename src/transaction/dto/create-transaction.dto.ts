import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
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

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoryIds: [number];
}
