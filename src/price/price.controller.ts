import { UserRoleTypes } from '../user/types/user-role.types';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/authGuard.guard';
import { UpdateOnePriceDto } from './dto/updateOnePriceDto.dto';
import { CreatePriceDto } from './dto/createPriceDto.dto';
import { PriceService } from './price.service';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('price')
export class PriceContoller {
  constructor(private readonly priceService: PriceService) {}
  @ApiTags('Price Controller')
  @ApiOperation({ summary: 'create Price for one menu' })
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleTypes.ADMIN)
  @Post('create/:menuId')
  @ApiParam({ name: 'menuId' })
  @ApiBody({ type: CreatePriceDto })
  async createPrice(
    @Param('menuId') menuId: number,
    @Body() createPriceDto: CreatePriceDto[],
  ) {
    return await this.priceService.createPrice(createPriceDto, menuId);
  }
  @ApiTags('Price Controller')
  @ApiOperation({ summary: 'update one menu price' })
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleTypes.ADMIN)
  @Put('update')
  @ApiBody({ type: UpdateOnePriceDto })
  async updateOnePrice(@Body() updateOnePriceDto: UpdateOnePriceDto) {
    return await this.priceService.updateOnePrice(updateOnePriceDto);
  }
  @ApiTags('Price Controller')
  @ApiOperation({ summary: 'delete one price in menu' })
  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRoleTypes.ADMIN)
  @Delete('delete/:id')
  @ApiParam({ name: 'id' })
  async deletePrice(@Param('id') priceId) {
    return await this.priceService.deletePrice(priceId);
  }
}
