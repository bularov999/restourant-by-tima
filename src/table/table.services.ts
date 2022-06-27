import { UpdateTableDto } from './dto/updateTableDto.dto';
import { CreateTableDto } from './dto/createTableDto.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { TableEntity } from './entity/table.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TableStatusTypes } from './types/tableStatus.type';

@Injectable()
export class TableService {
    constructor(@InjectRepository(TableEntity) private readonly tableRepository: Repository<TableEntity>) { }

    async blockTable(id: number): Promise<UpdateResult> {
        const res = await this.tableRepository.update(id, { status: TableStatusTypes.BOOKED })
        return res
    }
    async unblockTable(id: number): Promise<UpdateResult> {
        const res = await this.tableRepository.update(id, { status: TableStatusTypes.AVAILABLE })
        return res
    }
    async deleteTable(id: number): Promise<DeleteResult> {
        const res = await this.tableRepository.delete(id)
        return res
    }

    async createTable(createTableDto: CreateTableDto): Promise<TableEntity> {
        const table = this.tableRepository.create(createTableDto)
        const res = await this.tableRepository.save(table)
        return res
    }

    async updateTable(updateTableDto: UpdateTableDto): Promise<TableEntity> {
        const table = await this.tableRepository.findOneBy({
            id: updateTableDto.id,
        });
        const newTable = await  this.tableRepository.save({
            ...table,
            ...updateTableDto,
        });

        return newTable
    }
}