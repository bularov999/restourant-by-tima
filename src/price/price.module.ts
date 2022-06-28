import { FileEntity } from '../file/entity/file.entity';
import { FileService } from '../file/file.service';
import { MenuModule } from '../menu/menu.module';
import { PriceContoller } from './price.controller';
import { MenuService } from '../menu/menu.service';
import { MenuEntity } from '../menu/entity/menu.entity';
import { PriceService } from './price.service';
import { PriceEntity } from './entity/price.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceEntity, MenuEntity, FileEntity]),
    MenuModule,
  ],
  controllers: [PriceContoller],
  providers: [PriceService, MenuService, FileService],
  exports: [PriceService],
})
export class PriceModule {}
