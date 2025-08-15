import { O, pipe } from '@mobily/ts-belt';

export const getCleanStringFromURL = (key: string, params: URLSearchParams) =>
   pipe(
      O.fromNullable(params.get(key)),
      O.map((s) => s.trim()),
      O.filter((s) => s.length > 0),
      O.getWithDefault<string>('')
   );

export const getValidNumberFromURL = (
   key: string,
   params: URLSearchParams,
   defaultValue: number,
   maxValue: number
) =>
   pipe(
      getCleanStringFromURL(key, params),
      O.map((v) => parseInt(v, 10)),
      O.filter((v) => v <= maxValue),
      O.getWithDefault<number>(defaultValue)
   );
