import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1719080222290 implements MigrationInterface {
  name = 'CreateTables1719080222290';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "architect" ("architector_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "license" character varying NOT NULL, CONSTRAINT "PK_3c9d549892330ce7e81ad8900ed" PRIMARY KEY ("architector_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "executor" ("executor_id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_1f03d7b8f33e5fbc539d877e779" PRIMARY KEY ("executor_id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."project_status_enum" AS ENUM('not_started', 'in_progress', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("project_id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" "public"."project_status_enum" NOT NULL DEFAULT 'not_started', "executor_id" integer, CONSTRAINT "PK_1a480c5734c5aacb9cef7b1499d" PRIMARY KEY ("project_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_architects_architect" ("projectProjectId" integer NOT NULL, "architectArchitectorId" integer NOT NULL, CONSTRAINT "PK_45a47db6a1912ee01e6c168f02f" PRIMARY KEY ("projectProjectId", "architectArchitectorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85b5b200efc092290dea820f13" ON "project_architects_architect" ("projectProjectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad7bcc3196c8a49aa75e267f97" ON "project_architects_architect" ("architectArchitectorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "project" ADD CONSTRAINT "FK_f5d27b021fad50f2234ed5fed56" FOREIGN KEY ("executor_id") REFERENCES "executor"("executor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_architects_architect" ADD CONSTRAINT "FK_85b5b200efc092290dea820f13d" FOREIGN KEY ("projectProjectId") REFERENCES "project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_architects_architect" ADD CONSTRAINT "FK_ad7bcc3196c8a49aa75e267f971" FOREIGN KEY ("architectArchitectorId") REFERENCES "architect"("architector_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_architects_architect" DROP CONSTRAINT "FK_ad7bcc3196c8a49aa75e267f971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_architects_architect" DROP CONSTRAINT "FK_85b5b200efc092290dea820f13d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project" DROP CONSTRAINT "FK_f5d27b021fad50f2234ed5fed56"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ad7bcc3196c8a49aa75e267f97"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_85b5b200efc092290dea820f13"`,
    );
    await queryRunner.query(`DROP TABLE "project_architects_architect"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TYPE "public"."project_status_enum"`);
    await queryRunner.query(`DROP TABLE "executor"`);
    await queryRunner.query(`DROP TABLE "architect"`);
  }
}
