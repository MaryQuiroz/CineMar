import { useTranslation } from 'react-i18next';
import PageHeader from '../common/PageHeader';
import MovieFilters from './MovieFilters';
import SearchBar from '../common/SearchBar';

const MovieListHeader = ({
  title,
  selectedGenres,
  sortBy,
  onGenreChange,
  onSortChange,
  onClearFilters,
  totalMovies,
  onSearch,
  searchQuery
}) => {
  const { t } = useTranslation(['movies']);

  return (
    <>
      <PageHeader title={title} />
      <MovieFilters 
        selectedGenres={selectedGenres}
        sortBy={sortBy}
        onGenreChange={onGenreChange}
        onSortChange={onSortChange}
        onClearFilters={onClearFilters}
        totalMovies={totalMovies}
      />
      <div className="mb-6">
        <SearchBar 
          onSearch={onSearch} 
          placeholder={t('movies:search')}
          initialValue={searchQuery}
        />
      </div>
    </>
  );
};

export default MovieListHeader;