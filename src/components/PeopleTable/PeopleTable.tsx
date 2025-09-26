import React from 'react';
import { Person } from '../../types/Person';
import PersonLink from '../PersonLink/PersonLink';

export const PeopleTable: React.FC<{
  people: Person[];
  selectedSlug?: string;
}> = ({ people, selectedSlug }) => {
  const normalize = (s?: string) => (s ? s.trim().toLowerCase() : '');

  const findByName = (name?: string) => {
    if (!name) {
      return undefined;
    }

    const target = normalize(name);

    return people.find(p => normalize(p.name) === target);
  };

  return (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody data-cy="peopleTableBody">
          {people.map(person => {
            const isSelected = selectedSlug === person.slug;
            const mother = findByName(person.motherName);
            const father = findByName(person.fatherName);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={isSelected ? 'has-background-warning' : ''}
              >
                <td data-cy="personName">
                  <PersonLink person={person} />
                </td>

                <td data-cy="personSex">{person.sex}</td>
                <td data-cy="personBorn">{person.born}</td>
                <td data-cy="personDied">{person.died}</td>

                <td
                  data-cy="personMother"
                  className={mother?.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>

                <td data-cy="personFather">
                  {father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
