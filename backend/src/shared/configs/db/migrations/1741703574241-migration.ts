import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741703574241 implements MigrationInterface {
    name = 'Migration1741703574241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "discount" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "discount" DROP NOT NULL`);
    }

}
