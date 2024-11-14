import { Award, Calendar, Film } from "lucide-react";
import { useTranslation } from "react-i18next";

export const DetailsTab = ({ movie }) => {
    const { t } = useTranslation(['movies']);
  
    return (
      <div className="space-y-6">
        {/* Genres */}
        <section>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Film className="w-4 h-4 text-cinema-red" />
            {t('movies:details.genres')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span 
                key={genre.id}
                className="px-3 py-1 bg-cinema-gray/30 rounded-full text-gray-300 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </section>
  
        {/* Release Info */}
        <section>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cinema-red" />
            {t('movies:details.release_info')}
          </h3>
          <div className="bg-cinema-gray/30 p-4 rounded-lg">
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="text-gray-400">{t('movies:details.release_date')}:</span>{' '}
                {new Date(movie.release_date).toLocaleDateString()}
              </p>
              {movie.status && (
                <p>
                  <span className="text-gray-400">{t('movies:details.status')}:</span>{' '}
                  {movie.status}
                </p>
              )}
            </div>
          </div>
        </section>
  
        {/* Additional Details */}
        {(movie.budget > 0 || movie.revenue > 0) && (
          <section>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-cinema-red" />
              {t('movies:details.financial_info')}
            </h3>
            <div className="space-y-3">
              {movie.budget > 0 && (
                <div className="bg-cinema-gray/30 p-4 rounded-lg">
                  <span className="text-gray-400">{t('movies:details.budget')}:</span>{' '}
                  <span className="text-gray-300">
                    ${movie.budget.toLocaleString()}
                  </span>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="bg-cinema-gray/30 p-4 rounded-lg">
                  <span className="text-gray-400">{t('movies:details.revenue')}:</span>{' '}
                  <span className="text-gray-300">
                    ${movie.revenue.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    );
  };