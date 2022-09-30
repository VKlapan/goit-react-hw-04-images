import PropTypes from 'prop-types';
import { useState, useCallback, memo } from 'react';
import { FcSearch } from 'react-icons/fc';

import {
  HeaderForm,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInput = useCallback(
    event => {
      const query = event.currentTarget.value;
      setQuery(query);
    },
    [setQuery]
  );

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      if (query.trim() === '') return alert('no search query');
      onSubmit(query);
      setQuery('');
    },
    [query, setQuery, onSubmit]
  );

  return (
    <HeaderForm>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size="30" />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          name="query"
          value={query}
          onChange={handleInput}
        />
      </SearchForm>
    </HeaderForm>
  );
};

export default memo(Searchbar);

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
