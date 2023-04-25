import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsername1681943621975 implements MigrationInterface {
    name = 'AlterTableUsername1681943621975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD CONSTRAINT "unique_username" UNIQUE ("username", "tipo")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP CONSTRAINT "unique_username"`);
    }

}
