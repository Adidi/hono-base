import { serve } from '@hono/node-server';
import { HTTPException } from 'hono/http-exception';
import { logger } from 'hono/logger';
import env from '@/env';
import factory from '@/factory';
import routes from './routes';

const app = factory.createApp();

app.use(logger());

app.route('/', routes);

// onError global route to always send json response in this server:
app.onError((err, c) => {
	console.error(err);
	const staus = err instanceof HTTPException ? err.status : 500;
	return c.json({ message: err.message, err: err.cause }, staus);
});

serve(
	{
		fetch: app.fetch,
		port: env.PORT
	},
	info => {
		console.log(`Server is running on http://localhost:${info.port}`);
	}
);
