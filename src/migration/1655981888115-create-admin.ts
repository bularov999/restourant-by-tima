import { MigrationInterface, QueryRunner } from "typeorm"

export class createAdmin1655981888115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `INSERT INTO "user_entity" (id, name, surname, email,phone, password, "created_date_time", role) VALUES (DEFAULT, 'admin' , 'admin','admin@gmail.com', '055505050','$2b$10$si/YO9esKDr6AiHwt9tzTuXZrLSWceKOCbK9iDc7uetPH5EQNrl8W', DEFAULT, 'admin');`,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `DELETE FROM "user_entity" WHERE email='admin@gmail.com';`,
        );
      }

}
