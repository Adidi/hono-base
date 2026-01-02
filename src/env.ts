import { z } from 'zod';
import { zStringBoolean } from '@/utils';

const envSchema = z.object({
	ENV: z.enum(['dev', 'staging', 'production']).default('dev'),
	SECURE: zStringBoolean.default(false),

	// mandatory:
	PORT: z.coerce.number().int().positive(),
	JWT_SECRET: z.string()
});

const env = envSchema.parse(process.env);

export default env;
