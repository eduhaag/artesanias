import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPurchasesTable1651090688909 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'purchases',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'invoice_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observations',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'discount',
            type: 'numeric(12,2)',
            default: 0,
          },
          {
            name: 'addition',
            type: 'numeric(12,2)',
            default: 0,
          },
          {
            name: 'shipping_coast',
            type: 'numeric(12,2)',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKSupplier',
            columnNames: ['supplier_id'],
            referencedTableName: 'suppliers',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
  }
}
