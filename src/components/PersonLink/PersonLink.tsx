// Bloco Imports - PersonLink
import React from 'react';
import { Person } from '../../types/Person';

// Bloco PersonLink - componente reaproveitável
export const PersonLink: React.FC<{ person?: Person }> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <a className={className} href={`#/people/${person.slug}`}>
      {person.name}
    </a>
  );
};

export default PersonLink;
