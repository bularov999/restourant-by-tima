import { RequestExpress } from '../interfaces/expressRequestInterface.interface';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<RequestExpress>()
        if(request.user) {
            return true
        }
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
    }
}