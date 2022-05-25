import { ApiParam, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { transactionType } from "../entities/transaction.entity"; 


export class CreateTransactionDto {

@ApiProperty ({  enum: ['profitable', 'consumable']})
readonly trType: transactionType;

@ApiProperty()
readonly amount: number;

@ApiProperty()
readonly bankId: string;

constructor({trType, amount}: CreateTransactionDto){
this.trType = trType;
this.amount = amount;

}
}