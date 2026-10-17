import { useRouteError } from '@remix-run/react';
import { Error } from '~/layouts/error';

export async function loader() {
  throw new Response(null, { status: 404, statusText: 'Not found' });
}

export const meta = () => {
  return [{ title: 'Page not found | Dafe Smith Ofoh' }];
};

export function ErrorBoundary() {
  const error = useRouteError();

  return <Error error={error} />;
}
