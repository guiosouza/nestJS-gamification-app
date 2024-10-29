import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeTotalTimeNullableInTasks1730221475636 implements MigrationInterface {
    name = 'MakeTotalTimeNullableInTasks1730221475636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL DEFAULT (0), "totalTime" integer, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
    }

}
