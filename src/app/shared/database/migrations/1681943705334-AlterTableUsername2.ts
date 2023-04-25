import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUsername21681943705334 implements MigrationInterface {
    name = 'AlterTableUsername21681943705334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP CONSTRAINT "unique_username"`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP CONSTRAINT "UQ_6ccff37176a6978449a99c82e10"`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD CONSTRAINT "unique_username" UNIQUE ("username", "tipo")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" DROP CONSTRAINT "unique_username"`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "vagas"."usuario" ADD CONSTRAINT "unique_username" UNIQUE ("username", "tipo")`);
    }

}
