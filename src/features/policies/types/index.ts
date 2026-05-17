import { z } from 'zod';
import type { paramsSchema } from '../../../router/schemas/params-schema';

export type ParamsType = z.infer<typeof paramsSchema>;
