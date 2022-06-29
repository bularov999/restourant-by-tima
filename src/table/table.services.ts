import { UpdateTableDto } from './dto/updateTableDto.dto';
import { CreateTableDto } from './dto/createTableDto.dto';
import { TableEntity } from './entity/table.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TableStatusTypes } from './types/tableStatus.type';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(TableEntity)
    private readonly tableRepository: Repository<TableEntity>,
  ) {}

  async blockTable(id: number): Promise<UpdateResult> {
    return await this.tableRepository.update(id, {
      status: TableStatusTypes.BOOKED,
    });
  }
  async unblockTable(id: number): Promise<UpdateResult> {
    return await this.tableRepository.update(id, {
      status: TableStatusTypes.AVAILABLE,
    });
  }
  async deleteTable(id: number): Promise<DeleteResult> {
    return await this.tableRepository.delete(id);
  }

  async createTable(createTableDto: CreateTableDto): Promise<TableEntity> {
    const table = this.tableRepository.create(createTableDto);
    return await this.tableRepository.save(table);
  }

  async updateTable(updateTableDto: UpdateTableDto): Promise<TableEntity> {
    const table = await this.tableRepository.findOneBy({
      id: updateTableDto.id,
    });
    return await this.tableRepository.save({
      ...table,
      ...updateTableDto,
    });
  }
  async getAllTables(): Promise<TableEntity[]> {
    return await this.tableRepository.find();
  }
  async getOneTable(tableId: number): Promise<TableEntity> {
    return await this.tableRepository.findOneBy({ id: tableId });
  }
}
