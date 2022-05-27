import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  offset: number;

  results: TData[];
}
