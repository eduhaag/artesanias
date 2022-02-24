import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSalesTable1644608524822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sales',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
          {
            name: 'shipping_id',
            type: 'int',
          },
          {
            name: 'payment_method_id',
            type: 'int',
          },
          {
            name: 'channel_id',
            type: 'int',
          },
          {
            name: 'status_id',
            type: 'int',
          },
          {
            name: 'shipping_forecast',
            type: 'timestamp',
          },
          {
            name: 'invoice_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reference',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'zip_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'street',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'number',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'char(2)',
            isNullable: true,
          },
          {
            name: 'observation',
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
            name: 'FKClient',
            columnNames: ['client_id'],
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKShippingMethod',
            columnNames: ['shipping_id'],
            referencedTableName: 'shipping_methods',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKPaymentMethod',
            columnNames: ['payment_method_id'],
            referencedTableName: 'payment_methods',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKSaleChannel',
            columnNames: ['channel_id'],
            referencedTableName: 'sale_channels',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKSaleStatus',
            columnNames: ['status_id'],
            referencedTableName: 'sale_status',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sales');
  }
}
