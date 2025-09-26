import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types/Person';

export const PersonLink: React.FC<{ person?: Person }> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link className={className} to={`/people/${person.slug}`}>
      {person.name}
    </Link>
  );
};

export default PersonLink;
