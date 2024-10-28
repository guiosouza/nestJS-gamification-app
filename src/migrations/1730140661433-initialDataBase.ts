import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDataBase1730140661433 implements MigrationInterface {
    name = 'InitialDataBase1730140661433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attributes" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "exp" integer NOT NULL, "level" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "badges" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "requiredLevel" integer NOT NULL, CONSTRAINT "UQ_c8d0bf04b0999a223ff1a316bdb" UNIQUE ("title"), CONSTRAINT "UQ_c8d0bf04b0999a223ff1a316bdb" UNIQUE ("title"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "totalExp" integer NOT NULL DEFAULT (0), "level" integer NOT NULL DEFAULT (1), "badgeId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "userlevels" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "expRequired" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "attributeLevels" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "level" integer NOT NULL, "expRequired" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "attributes_tasks_tasks" ("attributesId" integer NOT NULL, "tasksId" integer NOT NULL, PRIMARY KEY ("attributesId", "tasksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_609f59b4f98605a8f04f037021" ON "attributes_tasks_tasks" ("attributesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef" ON "attributes_tasks_tasks" ("tasksId") `);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer, CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "totalExp" integer NOT NULL DEFAULT (0), "level" integer NOT NULL DEFAULT (1), "badgeId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "FK_13a2e872426452c4e21180ba780" FOREIGN KEY ("badgeId") REFERENCES "badges" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "password", "isActive", "totalExp", "level", "badgeId") SELECT "id", "name", "password", "isActive", "totalExp", "level", "badgeId" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`DROP INDEX "IDX_609f59b4f98605a8f04f037021"`);
        await queryRunner.query(`DROP INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef"`);
        await queryRunner.query(`CREATE TABLE "temporary_attributes_tasks_tasks" ("attributesId" integer NOT NULL, "tasksId" integer NOT NULL, CONSTRAINT "FK_609f59b4f98605a8f04f0370216" FOREIGN KEY ("attributesId") REFERENCES "attributes" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_4f75c28a0fb02ec65ded1fd3ef7" FOREIGN KEY ("tasksId") REFERENCES "tasks" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("attributesId", "tasksId"))`);
        await queryRunner.query(`INSERT INTO "temporary_attributes_tasks_tasks"("attributesId", "tasksId") SELECT "attributesId", "tasksId" FROM "attributes_tasks_tasks"`);
        await queryRunner.query(`DROP TABLE "attributes_tasks_tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_attributes_tasks_tasks" RENAME TO "attributes_tasks_tasks"`);
        await queryRunner.query(`CREATE INDEX "IDX_609f59b4f98605a8f04f037021" ON "attributes_tasks_tasks" ("attributesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef" ON "attributes_tasks_tasks" ("tasksId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef"`);
        await queryRunner.query(`DROP INDEX "IDX_609f59b4f98605a8f04f037021"`);
        await queryRunner.query(`ALTER TABLE "attributes_tasks_tasks" RENAME TO "temporary_attributes_tasks_tasks"`);
        await queryRunner.query(`CREATE TABLE "attributes_tasks_tasks" ("attributesId" integer NOT NULL, "tasksId" integer NOT NULL, PRIMARY KEY ("attributesId", "tasksId"))`);
        await queryRunner.query(`INSERT INTO "attributes_tasks_tasks"("attributesId", "tasksId") SELECT "attributesId", "tasksId" FROM "temporary_attributes_tasks_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_attributes_tasks_tasks"`);
        await queryRunner.query(`CREATE INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef" ON "attributes_tasks_tasks" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_609f59b4f98605a8f04f037021" ON "attributes_tasks_tasks" ("attributesId") `);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "password" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "totalExp" integer NOT NULL DEFAULT (0), "level" integer NOT NULL DEFAULT (1), "badgeId" integer, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "password", "isActive", "totalExp", "level", "badgeId") SELECT "id", "name", "password", "isActive", "totalExp", "level", "badgeId" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "exp" integer NOT NULL, "isTimeBased" boolean NOT NULL, "timePack" integer NOT NULL, "totalTime" integer NOT NULL, "status" boolean NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId") SELECT "id", "title", "description", "exp", "isTimeBased", "timePack", "totalTime", "status", "userId" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`DROP INDEX "IDX_4f75c28a0fb02ec65ded1fd3ef"`);
        await queryRunner.query(`DROP INDEX "IDX_609f59b4f98605a8f04f037021"`);
        await queryRunner.query(`DROP TABLE "attributes_tasks_tasks"`);
        await queryRunner.query(`DROP TABLE "attributeLevels"`);
        await queryRunner.query(`DROP TABLE "userlevels"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "badges"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "attributes"`);
    }

}
