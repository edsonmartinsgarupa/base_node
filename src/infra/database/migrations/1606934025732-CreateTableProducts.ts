import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1606934025732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          { name: 'uid', type: 'uuid', isPrimary: true, isNullable: false },
          { name: 'name', type: 'varchar', length: '100', isNullable: false },
          { name: 'category', type: 'uuid', isNullable: false },
          {
            name: 'price',
            type: 'decimal',
            precision: 6,
            scale: 2,
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products', true, true, true);
  }
}
