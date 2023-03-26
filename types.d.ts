type User = {
	id: number;
	username: string;
	password?: string;
	createdAt: string;
	role: string;
};

type Client = {
	id: number;
	first_name?: string;
	last_name?: string;
	company_name?: string;
	identification: string;
	email_address: string;
	phone_number: string;
	createdAt: string;
	updatedAt: string;
};

type Project = {
	id: number;
	client_id: number;
	project_name: string;
	status: string;
	progress: number;
	value: number;
	discount: number;
	createdAt: string;
	updatedAt: string;
};

type ProjectCient = {
	id: number;
	client_id: number;
	project_name: string;
	status: string;
	progress: number;
	discount: number;
	value: number;
	createdAt: string;
	updatedAt: string | null;
	first_name: string | null;
	last_name: string | null;
	company_name: string | null;
};

type ProjectItem = {
	id?: number;
	key?: number;
	service?: string;
	value?: number;
};

type Item = {
	key: number;
	service: string;
	value: number;
};
type Items = Item[];

type Task = {
	id: number;
	project_id: number;
	task: string;
	status: string;
	createdAt: string;
	updatedAt: string;
};

type Payment = {
	id: number;
	project_id: number;
	amount: number;
	paidAt: string;
};
