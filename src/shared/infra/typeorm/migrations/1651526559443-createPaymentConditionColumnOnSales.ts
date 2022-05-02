import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createPaymentConditionColumnOnSales1651526559443
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'installments',
        type: 'int',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sales', 'installments');
  }
}
