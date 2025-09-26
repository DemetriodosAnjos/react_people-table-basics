// Bloco Imports - PeoplePage
import React from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import PeopleTable from '../components/PeopleTable/PeopleTable';
import usePeople from '../hooks/usePeople';

// Bloco PeoplePage - componente da página usando usePeople e Retry
const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { people, loading, error, reload } = usePeople();

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loading && (
          <div className="box table-container">
            <Loader />
          </div>
        )}

        {!loading && error && (
          <div>
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
            <button
              data-cy="retryButton"
              className="button is-danger"
              onClick={reload}
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && !error && people.length > 0 && (
          <PeopleTable people={people} selectedSlug={slug} />
        )}
      </div>
    </div>
  );
};

export default PeoplePage;
