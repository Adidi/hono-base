import { z } from 'zod';

export const zStringBoolean = z.preprocess(val => {
	if (val === 'true') return true;
	if (val === 'false') return false;
	return val;
}, z.boolean('value should be true OR false'));
