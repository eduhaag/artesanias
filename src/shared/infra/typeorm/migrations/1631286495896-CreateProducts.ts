import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1631286495896 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'category_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'coast',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'price',
            type: 'numeric',
            default: 0,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'moves_stock',
            type: 'bool',
            default: false,
          },
          {
            name: 'to_sale',
            type: 'bool',
            default: true,
          },
          {
            name: 'observations',
            type: 'varchar',
            isNullable: true,
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
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'product_categories',
            referencedColumnNames: ['id'],
            columnNames: ['category_id'],
            name: 'FKProductCategory',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
