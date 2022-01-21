import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type BooksSearchResult = {
  docs: Book[];
};

type Book = {
  key: string;
  title: string;
  author_name: string;
  first_publish_year: number;
};

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://openlibrary.org/' }),
  endpoints: (builder) => ({
    searchBooks: builder.query<BooksSearchResult, string>({
      query: (term) => `search.json?q=${encodeURIComponent(term)}`,
    }),
  }),
});

export const { useSearchBooksQuery } = booksApi;
