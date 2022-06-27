import { MenuService } from './../menu/menu.service';
import { UpdateOnePriceDto } from './dto/updateOnePriceDto.dto';
import { MenuEntity } from './../menu/entity/menu.entity';
import { CreatePriceDto } from './dto/createPriceDto.dto';
import { PriceEntity } from './entity/price.entity';
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In, InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class PriceService {
    constructor(
        @InjectRepository(PriceEntity) private readonly priceRepository: Repository<PriceEntity>,
        @Inject(forwardRef(() => MenuService)) private readonly menuService: MenuService
    ) { }
    async createPrice(createPriceDto: CreatePriceDto[], menuId: number): Promise<PriceEntity[]> {
        const menu = await this.menuService.getOneMenuBy(menuId)
        const instance = this.priceRepository.create(createPriceDto)
        const newInstace = instance.map((item) => {
            return { ...item, menu }
        })
        return await this.priceRepository.save(newInstace)
    }

    async deletePrice(menuId: number) {
        const deletedPrice = await this.priceRepository.delete(menuId)
        return deletedPrice
    }
    async getPricesByIdAndSize(menuIds: number[], sizes: number[]): Promise<PriceEntity[]> {
        return await this.priceRepository.find({
            where: {
                id: In(menuIds),
                size: In(sizes)
            }
        })
    }
    async updateOnePrice(updateOnePriceDto: UpdateOnePriceDto): Promise<UpdateResult> {
        return await this.priceRepository.update(updateOnePriceDto.id,
            {
                size: updateOnePriceDto.size,
                price: updateOnePriceDto.price
            })
    }
}