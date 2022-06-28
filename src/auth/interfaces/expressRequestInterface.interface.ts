import { UserEntity } from 'src/user/entity/user.entity';
import { Request } from 'express';

export interface RequestExpress extends Request {
  user?: UserEntity;
}
