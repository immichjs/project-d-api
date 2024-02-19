import { UserStatus } from 'src/utils/enums/user-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1707812203004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('users'))) {
      await queryRunner.createTable(
        new Table({
          name: 'users',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '255',
            },
            {
              name: 'email',
              type: 'varchar',
              length: '319',
              isUnique: true,
            },
            {
              name: 'password',
              type: 'varchar',
            },
            {
              name: 'phone',
              type: 'varchar',
              length: '20',
              isNullable: true,
            },
            {
              name: 'status',
              type: 'enum',
              enum: Object.values(UserStatus),
            },
            {
              name: 'created_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
