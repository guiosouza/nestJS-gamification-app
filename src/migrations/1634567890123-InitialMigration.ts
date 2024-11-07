import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1634567890123 implements MigrationInterface {
    name = 'InitialMigration1634567890123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`patent\` varchar(255) NOT NULL DEFAULT 'Novice', \`level\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
