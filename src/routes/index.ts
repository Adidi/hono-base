import factory from '@/factory';
import _protected from './_protected';

const routes = factory.createApp();

routes.get('/', c => {
	return c.json({ hello: 'Alex!' });
});

routes.route('/', _protected);

export default routes;
