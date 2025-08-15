export const updateSearchParam = (
   searchParams: URLSearchParams,
   key: string,
   value: string | undefined,
   reset = false
): URLSearchParams => {
   if (value) {
      searchParams.set(key, value);
   } else {
      searchParams.delete(key);
   }
   if (reset) searchParams.set('page', '1');
   return searchParams;
};
