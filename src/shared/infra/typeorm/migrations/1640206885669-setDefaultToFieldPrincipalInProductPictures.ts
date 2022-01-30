import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class setDefaultToFieldPrincipalInProductPictures1640206885669
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product_pictures',
      'principal',
      new TableColumn({
        name: 'principal',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'product_pictures',
      'principal',
      new TableColumn({
        name: 'principal',
        type: 'bool',
      }),
    );
  }
}
