import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('file')
export class FileController {
  constructor(private service: FileService) {}
  @ApiTags('File controller')
  @ApiOperation({ summary: 'upload file' })
  @ApiBearerAuth('defaultBearerAuth')
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.service.create(file);
  }

  @ApiTags('File controller')
  @ApiOperation({ summary: 'updating file' })
  @ApiBearerAuth('defaultBearerAuth')
  @Patch('update/:name')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('name') name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.service.update(name, file);
  }
  @ApiTags('File controller')
  @ApiOperation({ summary: 'get File' })
  @ApiBearerAuth('defaultBearerAuth')
  @Get(':name')
  async getFile(@Param('name') name: string, @Res() res) {
    const file = this.service.get(name);
    await file.pipe(res);
  }
}
