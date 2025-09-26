import { useEffect, useState } from 'react';
import { Person } from '../types/Person';

const API_URL = '/api/people';

export function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const { signal } = controller;

    const load = async () => {
      setLoading(true);
      setError(undefined);

      try {
        const res = await fetch(API_URL, { signal });

        if (!res.ok) {
          throw new Error(`Network response was not ok: ${res.status}`);
        }

        const data = (await res.json()) as Person[];

        if (!cancelled) {
          setPeople(data);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
              setError('Request aborted');
            } else {
              setError(err.message);
            }
          } else {
            setError(String(err));
          }

          setPeople([]);
        }

        /* eslint-disable-next-line no-console */
        console.error(err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { people, loading, error };
}

export default usePeople;
