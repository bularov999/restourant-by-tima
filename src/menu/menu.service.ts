import { PriceService } from './../price/price.service';
import { UpdateMenuDto } from './dto/updateMenuDto.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuEntity } from './entity/menu.entity';
import { FileService } from './../file/file.service';
import { Inject, Injectable } from "@nestjs/common";
import { In, Repository, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuService {
    constructor(
        private readonly fileService: FileService,
        private readonly priceService: PriceService,
        @InjectRepository(MenuEntity) private readonly menuRepository: Repository<MenuEntity>
    ) { }

    async createMenu(menuDto: CreateMenuDto): Promise<MenuEntity> {
        menuDto.pictures = await this.fileService.findFilesById({ where: { id: In(menuDto.pictureIds) } });
        const instance = this.menuRepository.create(menuDto)
        return await this.menuRepository.save(instance)

    }
    async updateMenu(updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
        const oldMenu = await this.menuRepository.findOneBy({ id: updateMenuDto.id })
        updateMenuDto.pictures = await this.fileService.findFilesById({ where: { id: In(updateMenuDto.picturesId) } })
        return await this.menuRepository.save({ ...oldMenu, ...updateMenuDto })
        
    }
    async deleteMenu(id: number): Promise<DeleteResult> {
        return await this.menuRepository.delete(id)
    }
    async getAllMenu(): Promise<MenuEntity[]> {
        return await this.menuRepository.find()
    }
    async getOneMenuBy(id: number): Promise<MenuEntity> {
        return await this.menuRepository.findOneBy({ id })
    }
    async getMenusBy(menuIds: number[]): Promise<MenuEntity[]> {
        return await this.menuRepository.findBy({ id: In(menuIds) })
    }

}