import { v4 as uuidv4 } from 'uuid';

/**
 * Wrapper typé pour uuidv4 afin de garantir le typage et la compatibilité ESLint/TypeScript.
 */
export function generateUuid(): string {
  return uuidv4();
}
