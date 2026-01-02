import users from './users.json';

type User = (typeof users)[number];

export const getUsers = async () => {
	return users;
};

export const getUser = async (id: number) => {
	return users.find(user => user.id === id);
};

export const createUser = async (name: string, email: string, age: number) => {
	const user: User = {
		id: users.at(-1)!.id + 1,
		name,
		email,
		age,
		created: new Date().toISOString()
	};

	users.push(user);
	return user;
};
