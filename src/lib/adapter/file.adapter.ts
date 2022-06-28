import { FileAdapterError } from '../errors/fileAdapter.error';
import { v4 } from 'uuid';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  ReadStream,
} from 'fs';
import { join } from 'path';

export interface File {
  name: string;
}
export interface FileMeta {
  name: string;
}

export class FileAdapter {
  constructor(readonly uploadDir = join('uploads')) {}

  put(buffer: Buffer): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!buffer) {
        reject(new FileAdapterError('file must be attached'));
      }
      const name = v4();
      console.log(this.getFilePath());
      const stream = createWriteStream(this.getFilePath());

      stream.write(buffer);
      stream.on('open', () => console.log('starting write file ' + name));
      stream.on('error', (e) => reject(new FileAdapterError(e.message)));
      stream.on('ready', () => resolve({ name }));
    });
  }

  get(name: string): ReadStream {
    const path = this.getFilePath();
    const isExists = existsSync(path);
    if (!isExists || !name) {
      throw new FileAdapterError('file not exist');
    }
    return createReadStream(path);
  }

  isExists(): boolean {
    const path = this.getFilePath();
    return existsSync(path);
  }

  getFilePath() {
    return join(__dirname, '..', '..', 'uploads');
  }
}
const fileAdapter = new FileAdapter('uploads');

export { fileAdapter };
