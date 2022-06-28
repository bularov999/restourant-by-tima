import { FileController } from './file.controller';
import { FileEntity } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
