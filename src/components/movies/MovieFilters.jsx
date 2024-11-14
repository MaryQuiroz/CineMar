import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';
import { useGenres } from '@/hooks/useGenres';

const sortOptions = [
  { name: 'Más recientes', value: 'newest' },
  { name: 'Título: A-Z', value: 'title-asc' },
  { name: 'Título: Z-A', value: 'title-desc' },
  { name: 'Duración: Mayor', value: 'duration-desc' },
  { name: 'Duración: Menor', value: 'duration-asc' },
];

const MovieFilters = ({ 
  selectedGenres, 
  sortBy, 
  onGenreChange, 
  onSortChange,
  onClearFilters,
  totalMovies 
}) => {
  const { t } = useTranslation(['navigation', 'movies']);
  const { genres, isLoading, error } = useGenres();

  return (
    <div className="bg-cinema-gray">
      <div className="container-custom py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left side - Active filters and total */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-400">
              {totalMovies} {t('movies:search')}
            </span>
            
            {selectedGenres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map(genreId => {
                  const genre = genres.find(g => g.id === genreId);
                  return genre && (
                    <span
                      key={genreId}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-cinema-red text-white"
                    >
                      {genre.name}
                      <button
                        onClick={() => onGenreChange(genreId)}
                        className="ml-1 hover:text-gray-200"
                        aria-label={t('actions.remove_filter', { filter: genre.name })}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
                
                <button
                  onClick={onClearFilters}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {t('actions.clear_filters')}
                </button>
              </div>
            )}
          </div>

          {/* Right side - Sort and filter dropdowns */}
          <div className="flex items-center gap-4">
            {/* Genre Filter Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                <FunnelIcon className="h-5 w-5" />
                {t('actions.filter')}
                <ChevronDownIcon className="h-5 w-5" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-cinema-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {isLoading ? (
                      <div className="px-4 py-2 text-sm text-gray-300">
                        {t('common:loading')}...
                      </div>
                    ) : error ? (
                      <div className="px-4 py-2 text-sm text-red-500">
                        {error}
                      </div>
                    ) : (
                      genres.map((genre) => (
                        <Menu.Item key={genre.id}>
                          {({ active }) => (
                            <button
                              onClick={() => onGenreChange(genre.id)}
                              className={`
                                ${active ? 'bg-cinema-gray text-white' : 'text-gray-300'}
                                ${selectedGenres.includes(genre.id) ? 'bg-cinema-red/10 text-cinema-red' : ''}
                                block w-full text-left px-4 py-2 text-sm
                              `}
                            >
                              {genre.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Sort Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                {t('actions.sort')}
                <ChevronDownIcon className="h-5 w-5" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-cinema-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            onClick={() => onSortChange(option.value)}
                            className={`
                              ${active ? 'bg-cinema-gray text-white' : 'text-gray-300'}
                              ${sortBy === option.value ? 'bg-cinema-red/10 text-cinema-red' : ''}
                              block w-full text-left px-4 py-2 text-sm
                            `}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;