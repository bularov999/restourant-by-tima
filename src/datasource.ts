import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()

export default new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username:'postgres',
    password: 'root',
    database: 'restaurant',
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["src/**/**/*.entity{.js, .ts}"],
    migrations: ["./src/migration/*.ts"],
    migrationsTableName: "migrations"
})