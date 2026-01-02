import { z } from 'zod';
import { HTTPException } from 'hono/http-exception';
import factory from '@/factory';
import { zv } from '@/middlewares';
import { getUser, getUsers, createUser, deleteUser } from '@/db/users';

const users = factory.createApp();

users.get(
	'/',
	zv(
		'query',
		z.object({
			page: z.coerce.number().int().min(1).default(1),
			limit: z.coerce.number().int().min(1).max(100).default(50)
		})
	),
	async c => {
		// if its got to here page & limit are type safe (numbers)!!
		const { page, limit } = c.req.valid('query');

		const users = await getUsers();

		return c.json({
			page,
			limit,
			data: users
		});
	}
);

users.get(
	'/:id',
	zv(
		'param',
		z.object({
			id: z.coerce.number().int().min(1)
		})
	),
	async c => {
		// if its got to here id is type safe (number)
		const { id } = c.req.valid('param');

		const user = await getUser(id);
		if (!user) {
			throw new HTTPException(404, { message: `user '${id}' not found!` });
		}

		return c.json(user);
	}
);

users.post(
	'/',
	zv(
		'json',
		z.object({
			name: z.string(),
			email: z.email(),
			age: z.number().int().min(1)
		})
	),
	async c => {
		// if its got to here name,email,age are type safe (string, string, number)
		const { name, email, age } = c.req.valid('json');

		const user = await createUser(name, email, age);

		return c.json(user);
	}
);

users.delete(
	'/:id',
	zv(
		'param',
		z.object({
			id: z.coerce.number().int().min(1)
		})
	),
	async c => {
		const { id } = c.req.valid('param');

		await deleteUser(id);

		return c.json({ success: true });
	}
);

export default users;
