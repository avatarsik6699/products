import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741357932916 implements MigrationInterface {
    name = 'Migration1741357932916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "slug" character varying(100) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "discount" numeric(10,2), "sku" character varying(100) NOT NULL, "photoUrl" character varying(255), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_464f927ae360106b783ed0b4106" UNIQUE ("slug"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
