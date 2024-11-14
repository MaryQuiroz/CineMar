import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Film, 
  Info, 
  Users, 

} from 'lucide-react';
import CastTab from './MovieContent/CastTab';
import SynopsisTab from './MovieContent/SynopsisTab';
import { DetailsTab } from './MovieContent/DetailsTab';

const MovieContent = ({ movie }) => {
  const { t } = useTranslation(['movies']);
  const [activeTab, setActiveTab] = useState('synopsis');

  const tabs = [
    { id: 'synopsis', icon: Info, label: 'movies:details.synopsis' },
    { id: 'cast', icon: Users, label: 'movies:cast.cast_crew' },
    { id: 'details', icon: Film, label: 'movies:details.details' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'synopsis':
        return <SynopsisTab movie={movie} />;
      case 'cast':
        return <CastTab movie={movie} />;
      case 'details':
        return <DetailsTab movie={movie} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-4 
              transition-all duration-200 relative
              ${activeTab === tab.id 
                ? 'text-cinema-red border-b-2 border-cinema-red font-medium' 
                : 'text-gray-400 hover:text-white'}
            `}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{t(tab.label)}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-cinema-gray/30 p-4 sm:p-6 rounded-xl backdrop-blur-sm">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default MovieContent;