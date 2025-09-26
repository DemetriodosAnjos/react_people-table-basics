// Bloco Imports - hook usePeople
import { useCallback, useEffect, useState } from 'react';
import { Person } from '../types/Person';

const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

// Bloco usePeople - hook que busca pessoas e expõe reload
export default function usePeople() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: Person[] = await res.json();

      setPeople(data);
    } catch {
      setPeople([]);
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  return { people, loading, error, reload: fetchPeople };
}
