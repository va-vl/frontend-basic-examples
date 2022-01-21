import * as React from 'react';
import { useSearchBooksQuery } from './booksApi';

type BookSearchResultsProps = {
  searchTerm: string;
};

const BookSearchResults: React.FC<BookSearchResultsProps> = ({
  searchTerm,
}) => {
  const [filteredSearchTerm, setFilteredSearchTerm] =
    React.useState(searchTerm);
  const { data, error, isLoading, isFetching } =
    useSearchBooksQuery(filteredSearchTerm);
  const books = data?.docs ?? [];

  React.useEffect(() => {
    if (searchTerm.length === 0 || searchTerm.length > 4) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  if (error) {
    return <div className='text-hint'>Error while fetching books</div>;
  } else if (isLoading) {
    return <div className='text-hint'>Loading books...</div>;
  } else if (isFetching) {
    return <div className='text-hint'>Fetching books...</div>;
  } else if (books.length === 0) {
    return <div className='text-hint'>No books found</div>;
  }

  return (
    <ul>
      {books.map(({ key, title, author_name, first_publish_year }) => (
        <li key={key}>
          {author_name}: {title}, {first_publish_year}
        </li>
      ))}
    </ul>
  );
};

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const DebounceExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <React.Fragment>
      <h1>Debounce example</h1>
      <p>Start typing some book name. Search starts at length 5</p>
      <input
        className='search-input'
        type='text'
        placeholder='Search books'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <BookSearchResults searchTerm={debouncedSearchTerm}></BookSearchResults>
    </React.Fragment>
  );
};

export default DebounceExample;
