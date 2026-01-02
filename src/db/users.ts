import users from './users.json';

type User = (typeof users)[number];

export const getUsers = async () => {
	return users;
};

export const getUser = async (id: number) => {
	return users.find(user => user.id === id);
};

export const createUser = async (name: string, email: string, age: number) => {
	const nextId = Math.max(...users.map(u => u.id)) + 1;

	const user: User = {
		id: nextId,
		name,
		email,
		age,
		created: new Date().toISOString()
	};

	users.push(user);
	return user;
};

export const deleteUser = async (id: number) => {
	const idx = users.findIndex(u => u.id === id);
	if (idx !== -1) {
		users.splice(idx, 1);
	}
	return true;
};
