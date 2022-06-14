import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createInvetoryMovimentTable1645729572672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'inventory_moviment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'material_id',
            type: 'uuid',
          },
          {
            name: 'sale_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'purchase_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'char(1)',
          },
          {
            name: 'quantity',
            type: 'numeric(12,3)',
          },
          {
            name: 'coast',
            type: 'numeric(12,3)',
          },
          {
            name: 'history',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKSale',
            columnNames: ['sale_id'],
            referencedTableName: 'sales',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKProduct',
            columnNames: ['material_id'],
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('inventory_moviment');
  }
}
