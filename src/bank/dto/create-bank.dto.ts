import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBankDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @ApiPropertyOptional({
    default: 0,
    type: Number,
  })
  balance?: number;

  @ApiProperty({
    example: '375556917985515',
  })
  @IsString()
  @IsNotEmpty()
  @IsCreditCard()
  card_number: string;
}
