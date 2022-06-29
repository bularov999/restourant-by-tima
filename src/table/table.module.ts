import { TableController } from './table.controller';
import { TableService } from './table.services';
import { TableEntity } from './entity/table.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TableEntity])],
  providers: [TableService],
  controllers: [TableController],
  exports: [TableService]
})
export class TableModule {}
