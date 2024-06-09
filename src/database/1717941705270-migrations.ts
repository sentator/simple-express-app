import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1717941705270 implements MigrationInterface {
  name = 'Migrations1717941705270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project" ADD "spending" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "spending"`);
  }
}
