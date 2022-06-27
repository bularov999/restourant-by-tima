import { CreateFileDto } from './dto/createFileDto.dto';
import { FileEntity } from './entity/file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, In } from 'typeorm';
import { ApiError } from '../lib/errors/api.error';
import { ReadStream } from 'fs';
import { fileAdapter } from 'src/lib/adapter/file.adapter';

@Injectable()
export class FileService  {
  constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {
  }

  async create(file: Express.Multer.File): Promise<FileEntity> {
    if (!file) {
      throw ApiError.badRequest('file must be attached');
    }
    const result = await fileAdapter.put(file.buffer);
    const data = new CreateFileDto();
    console.log('result', result);
    data.id = result.name;
    data.size = file.size;
    data.contentType = file.mimetype;
    const instance = this.fileRepository.create(data);
    return await this.fileRepository.save(instance)
  }

  async update(name: string, file: Express.Multer.File): Promise<FileEntity> {
    const isExists = fileAdapter.isExists(name);
    if (!isExists) {
      throw ApiError.notFound('file not found');
    }
    try {
      const instance = await this.fileRepository.findOneBy({ id: name });
      await fileAdapter.put(file.buffer, { name });
      instance.size = file.size;
      instance.contentType = file.mimetype;
      const fileEntity = await this.fileRepository.findOneBy({id: instance.id});
      return await this.fileRepository.save({
        ...instance,
        ...fileEntity
      })

    } catch (e) {
      throw ApiError.internal(e);
    }
  }
  async findFilesById(query):Promise<FileEntity[]> {
    const files = await this.fileRepository.find(query)
    return files
    
  }
  get(name: string): ReadStream {
    const isExists = fileAdapter.isExists(name);
    if (!isExists) {
      throw ApiError.notFound('file not found');
    }
    return fileAdapter.get(name);
  }

}