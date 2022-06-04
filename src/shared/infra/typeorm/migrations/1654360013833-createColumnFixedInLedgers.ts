import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class createColumnFixedInLedgers1654360013833
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ledgers',
      new TableColumn({
        name: 'is_fixed',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ledgers', 'is_fixed');
  }
}
