import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFinancialExtractTable1651175589783
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'statement',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
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
            name: 'ledger_id',
            type: 'int',
          },
          {
            name: 'bank_account_id',
            type: 'int',
          },
          {
            name: 'to_fulfilled',
            type: 'timestamp',
          },
          {
            name: 'fulfilled_on',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'value',
            type: 'numeric(12,2)',
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
            name: 'FKSale',
            columnNames: ['sale_id'],
            referencedTableName: 'sales',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKPurchase',
            columnNames: ['purchase_id'],
            referencedTableName: 'purchases',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKLedger',
            columnNames: ['ledger_id'],
            referencedTableName: 'ledgers',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKBankAccount',
            columnNames: ['bank_account_id'],
            referencedTableName: 'bank_accounts',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statement');
  }
}
