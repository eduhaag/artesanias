import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateColumnAdminInUsers1640124042080
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_admin',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_admin');
  }
}
