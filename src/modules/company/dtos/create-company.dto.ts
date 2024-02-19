import { User } from 'src/modules/user/domain/user.entity';

export class CreateCompanyDto {
	cnpj: string;

	name: string;

	user: User;
}
