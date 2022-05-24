import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Bank } from './bank/entities/bank.entity';
import { Category } from './category/entities/category.entity';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [BankModule, 
    CategoryModule, 
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // type: 'postgres' as 'postgres',
        type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [ Bank, Category, Transaction],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
    
})
export class AppModule {}
