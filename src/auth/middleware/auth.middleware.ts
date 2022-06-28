import { RequestExpress } from '../interfaces/expressRequestInterface.interface';
import { UserService } from './../../user/user.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'
import { jwtConstants } from '../constants/constants';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService) { }
    async use(req: RequestExpress, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }
        const token = req.headers.authorization.split(' ')[1].slice(0, -1)
        try {
            const decode = verify(token, jwtConstants.secret)
            const user = await this.userService.findOne({where: {id: decode.sub}})
            delete user.password
            req.user = user 
            next()
        } catch (error) {
            req.user = null
            next()
        }
    }
}