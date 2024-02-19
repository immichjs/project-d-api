import { User } from 'src/modules/user/domain/user.entity';
import { CompanyStatus } from 'src/utils/enums/company-status.enum';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('companies')
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		type: 'varchar',
		length: 14,
	})
	cnpj: string;

	@Column({
		type: 'varchar',
		length: 500,
	})
	name: string;

	@Column({
		type: 'enum',
		enum: CompanyStatus,
		default: CompanyStatus.ACTIVE,
	})
	status: CompanyStatus;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.companies)
	user: User;
}
