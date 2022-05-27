import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCreditCard, IsNumber, IsString } from 'class-validator';
import { CreateBankDto } from './create-bank.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {
  @IsString()
  @ApiPropertyOptional()
  readonly name?: string;

  @IsNumber()
  @ApiPropertyOptional()
  readonly balance?: number;

  @IsCreditCard()
  @ApiPropertyOptional({
    example: '5105105105105100',
  })
  readonly card_number?: string;
}
