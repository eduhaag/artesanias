import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createPaymentConditionColumnOnPurchases1651526995674
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'purchases',
      new TableColumn({
        name: 'installments',
        type: 'int',
        default: 1,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('purchases', 'installments');
  }
}
