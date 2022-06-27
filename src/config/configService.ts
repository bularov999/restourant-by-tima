import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path, { join } from "path";
import { DataSource } from "typeorm";
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const configuration = () => ({
    port: process.env.PORT,
    database: database()

});

const database = (): TypeOrmModuleOptions => {
    return   {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        synchronize: true,
        autoLoadEntities: true,
        namingStrategy: new SnakeNamingStrategy(),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: ["./migration/*.ts"],
    }
}