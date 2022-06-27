import { UserRoleTypes } from './../user/types/user-role.types';
import { RolesGuard } from './../auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/authGuard.guard';
import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('file')
export class FileController {
    constructor(private service: FileService) { }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.service.create(file);
    }


    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Put(':name')
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(
        @Param('name') name: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.service.update(name, file);
    }
    
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Get(':name')
    async getFile(@Param('name') name: string, @Res() res) {
        const file = this.service.get(name);
        await file.pipe(res);
    }

}