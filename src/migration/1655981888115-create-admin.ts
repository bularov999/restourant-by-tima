import { MigrationInterface, QueryRunner } from "typeorm"

export class createAdmin1655981888115 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO "user_entity" (id, name, email, phone, password, "created_date_time", role) VALUES (DEFAULT, 'admin' , 'admin@gmail.com', '055505050','$2a$10$z2m7dVDEFlEELF2ICcAtbuNOM01Dz2lwt7EkoYtZY7YinCDAw2GoW', DEFAULT, 'admin');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user_entity" WHERE email='admin@gmail.com';`,
    );
  }

}
