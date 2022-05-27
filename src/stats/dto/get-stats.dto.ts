import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class StatsDto {
  @ApiPropertyOptional()
  //   @IsDate()
  @IsString()
  dateFrom?: string;

  @ApiPropertyOptional()
  //   @IsDate()
  @IsString()
  dateTo?: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly categoryIds: [number];
}
