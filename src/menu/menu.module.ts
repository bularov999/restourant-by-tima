import { PriceEntity } from './../price/entity/price.entity';
import { PriceService } from './../price/price.service';
import { PriceModule } from './../price/price.module';
import { FileModule } from './../file/file.module';
import { FileService } from './../file/file.service';
import { FileEntity } from './../file/entity/file.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MenuEntity } from './entity/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([MenuEntity, FileEntity, PriceEntity]), FileModule], 
    providers: [MenuService, FileService, PriceService],
    controllers: [MenuController],
    exports: [MenuService]
})
export class MenuModule { }