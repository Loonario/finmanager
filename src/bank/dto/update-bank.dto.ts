import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBankDto } from './create-bank.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {
    @ApiProperty()
    readonly name?: string;

}
