import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'src/user/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { PaginatedDto } from './dto/paginated-trans.dto';
import { ApiPaginatedResponse } from './decorator';
import { PageOptionsDto } from './dto/page-options.dto';

@ApiTags('transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiSecurity('Authorization')
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post(':bankId')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Param(
      'bankId',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    bankId: string,
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.create(bankId, createTransactionDto);
  }

  @ApiPaginatedResponse(CreateTransactionDto)
  @ApiExtraModels(PaginatedDto)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.transactionService.findAll(pageOptionsDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transactionService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransactionDto: UpdateTransactionDto,
  // ) {
  //   return this.transactionService.update(+id, updateTransactionDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
