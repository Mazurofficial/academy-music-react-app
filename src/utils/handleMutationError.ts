import { err, type Result } from 'neverthrow';

export function handleMutationError<T = never>(e: unknown): Result<T, string> {
   const errorMessage = e instanceof Error ? e.message : String(e);
   return err(errorMessage);
}
