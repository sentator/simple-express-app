import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTokenTables1719312028636 implements MigrationInterface {
  name = 'CreateUserTokenTables1719312028636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_e50ca89d635960fda2ffeb1763" UNIQUE ("user_id"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`,
    );
    await queryRunner.query(`DROP TABLE "token"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
