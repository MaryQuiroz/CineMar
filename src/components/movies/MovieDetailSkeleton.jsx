import React from 'react';

const MovieDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-cinema-dark animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[35vh] md:h-[70vh] bg-cinema-gray/30">
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-16">
          <div className="container mx-auto">
            {/* Title Skeleton */}
            <div className="h-12 sm:h-14 md:h-16 bg-gray-700 rounded-lg w-3/4 mb-4" />
            
            {/* Movie Meta Skeleton */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="h-6 w-24 bg-gray-700 rounded-full" />
              <div className="h-6 w-32 bg-gray-700 rounded-full" />
              <div className="h-6 w-20 bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:py-12 -mt-8 sm:-mt-16 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis Section */}
            <div className="bg-cinema-gray/30 p-6 sm:p-8 rounded-xl">
              <div className="h-8 w-40 bg-gray-700 rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-700 rounded w-5/6" />
                <div className="h-4 bg-gray-700 rounded w-4/6" />
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-cinema-gray/30 p-6 sm:p-8 rounded-xl">
              <div className="h-8 w-32 bg-gray-700 rounded-lg mb-6" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Genres */}
                <div>
                  <div className="h-6 w-24 bg-gray-700 rounded mb-3" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-8 w-20 bg-gray-700 rounded-full" />
                    ))}
                  </div>
                </div>
                {/* Release Date */}
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-3" />
                  <div className="h-8 w-40 bg-gray-700 rounded" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-cinema-gray/30 p-6 sm:p-8 rounded-xl">
              <div className="h-8 w-48 bg-gray-700 rounded-lg mb-6" />
              {/* Date Selector Skeleton */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-gray-700 rounded" />
                ))}
              </div>
              {/* Session Times Skeleton */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-12 bg-gray-700 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;