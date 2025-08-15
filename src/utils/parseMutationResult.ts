import { ok, err } from 'neverthrow';
import type { Result } from 'neverthrow';
import type { ZodSchema } from 'zod';

export function parseMutationResult<T>(
   data: Record<string, unknown>,
   field: string,
   schema: ZodSchema<T>
): Result<T, string> {
   if (!data[field]) {
      return err('No data returned');
   }
   const parsed = schema.safeParse(data[field]);
   if (!parsed.success) {
      return err('Invalid response format');
   }
   return ok(parsed.data);
}
