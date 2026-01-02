import { createFactory } from 'hono/factory';
import type { JwtVariables } from 'hono/jwt';

type Env = {
	Variables: JwtVariables<{ sub: number }>;
};

export default createFactory<Env>();
