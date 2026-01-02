import { jwt } from 'hono/jwt';
import env from '@/env';
import factory from '@/factory';
import users from './users';

const _protected = factory.createApp();

// protect all routes under _protected with JWT middleware:
_protected.use(
	jwt({
		secret: env.JWT_SECRET
	}),
	async (c, next) => {
		// in each protected route u can take userId from the jwtPayload using:
		const { sub: userId } = c.get('jwtPayload');

		// take date here (using userId) from the user and put it in hono context var

		await next();
	}
);

_protected.route('/users', users);

export default _protected;
