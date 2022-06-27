import { OrderModule } from './order/order.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { PriceModule } from './price/price.module';
import { MenuModule } from './menu/menu.module';
import { FileModule } from './file/file.module';
import { TableModule } from './table/table.module';
import { DatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configuration } from './config/configService';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

 @Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.dev', '.env'],
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useClass: DatabaseConfig
  }),
  AuthModule,
  UserModule,
  BookingModule,
  TableModule,
  FileModule,
  MenuModule,
  PriceModule,
  OrderModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
  }
}

