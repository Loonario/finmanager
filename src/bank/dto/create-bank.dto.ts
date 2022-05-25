import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBankDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;

    @ApiProperty({
        default: 0,
        required: false
    })
    readonly balance?: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly card_number: string;

    constructor({name, balance, card_number}: CreateBankDto){
        this.name = name;
        this.balance = balance;
        this.card_number = card_number;
    }
  }