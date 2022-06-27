import { FileEntity } from './../file/entity/file.entity';
import { FileService } from './../file/file.service';
import { MenuEntity } from './../menu/entity/menu.entity';
import { PriceEntity } from './../price/entity/price.entity';
import { MenuService } from './../menu/menu.service';
import { PriceService } from './../price/price.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity, PriceEntity, MenuEntity, FileEntity])],
    providers: [OrderService, PriceService, MenuService, FileService],
    controllers: [OrderController]
})
export class OrderModule {

}