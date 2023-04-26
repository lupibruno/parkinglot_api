import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1682514316474 implements MigrationInterface {
    name = 'NewMigration1682514316474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`establishment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`motorcycleSpots\` int NOT NULL, \`carSpots\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`plate\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`entryTime\` timestamp NULL, \`exitTime\` datetime NULL, \`paid\` tinyint NULL, \`establishment_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vehicle\` ADD CONSTRAINT \`FK_09d8dcdb9de226d9aa10dfa1abc\` FOREIGN KEY (\`establishment_id\`) REFERENCES \`establishment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicle\` DROP FOREIGN KEY \`FK_09d8dcdb9de226d9aa10dfa1abc\``);
        await queryRunner.query(`DROP TABLE \`vehicle\``);
        await queryRunner.query(`DROP TABLE \`establishment\``);
    }

}
