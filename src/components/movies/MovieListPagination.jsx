import { useTranslation } from 'react-i18next';

const MovieListPagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation(['movies', 'navigation']);

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
      >
        {t('movies:previous')}
      </button>
      <span className="px-4 py-2 bg-cinema-gray text-white rounded-lg">
        {t('navigation:pagination.page', { 
          current: currentPage, 
          total: totalPages 
        })}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-cinema-gray text-white rounded-lg disabled:opacity-50 hover:bg-gray-700 transition-colors"
      >
        {t('movies:next')}
      </button>
    </div>
  );
};

export default MovieListPagination;