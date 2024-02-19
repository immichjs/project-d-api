import { CompanyStatus } from 'src/utils/enums/company-status.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompaniesTable1708384935816 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		if (!(await queryRunner.hasTable('companies'))) {
			await queryRunner.createTable(
				new Table({
					name: 'companies',
					columns: [
						{
							name: 'id',
							type: 'uuid',
							isPrimary: true,
							default: 'uuid_generate_v4()',
						},
						{
							name: 'cnpj',
							type: 'varchar',
							length: '14',
						},
						{
							name: 'name',
							type: 'varchar',
							length: '500',
						},
						{
							name: 'status',
							type: 'enum',
							enum: Object.values(CompanyStatus),
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
		await queryRunner.dropTable('companies');
	}
}
