import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741359077184 implements MigrationInterface {
    name = 'Migration1741359077184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "photoUrl" TO "photoFileName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "photoFileName" TO "photoUrl"`);
    }

}
