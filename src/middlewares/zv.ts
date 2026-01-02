import { zValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { z, ZodType } from 'zod';

export default <T extends ZodType, Target extends keyof ValidationTargets>(target: Target, schema: T) =>
	zValidator(target, schema, result => {
		if (!result.success) {
			throw new HTTPException(400, { message: z.prettifyError(result.error) });
		}
	});
