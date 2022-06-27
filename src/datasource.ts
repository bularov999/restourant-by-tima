import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'
dotenv.config()

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["src/**/**/*.entity{.js, .ts}"],
    migrations: ["./src/migration/*.ts"],
    migrationsTableName: "migrations"
})