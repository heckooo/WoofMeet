import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url)
  .then((res) => res.json());

export function useUser() {
  const { data, mutate, isLoading } = useSWR('/api/user', fetcher);
  const loading = isLoading || data;
  const user = data?.user;
  return [user, { mutate, loading }];
}