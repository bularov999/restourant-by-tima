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
        const menu: MenuEntity = await this.menuRepository.save(instance)
        return menu
    }
    async updateMenu(updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
        const oldMenu = await this.menuRepository.findOneBy({ id: updateMenuDto.id })
        updateMenuDto.pictures = await this.fileService.findFilesById({ where: { id: In(updateMenuDto.picturesId) } })
        const newMenu = await this.menuRepository.save({ ...oldMenu, ...updateMenuDto })
        return newMenu
    }
    async deleteMenu(id: number): Promise<DeleteResult> {
        const deletedMenu = await this.menuRepository.delete(id)
        return deletedMenu
    }
    async getAllMenu(): Promise<MenuEntity[]> {
        const menus = await this.menuRepository.find()
        return menus
    }
    async getOneMenuBy(id: number): Promise<MenuEntity> {
        const menu = await this.menuRepository.findOneBy({ id })
        return menu
    }
    async getMenusBy(menuIds: number[]): Promise<MenuEntity[]> {
        const menus = await this.menuRepository.findBy({ id: In(menuIds) })
        return menus
    }

}