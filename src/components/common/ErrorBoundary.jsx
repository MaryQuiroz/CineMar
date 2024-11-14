import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Aquí podrías enviar el error a un servicio de reporting
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error}
        resetError={this.handleReset}
      />;
    }

    return this.props.children;
  }
}

// Componente de fallback que se muestra cuando ocurre un error
const ErrorFallback = ({ error, resetError }) => {
  const { t } = useTranslation(['common']);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4 bg-cinema-dark">
      <div className="max-w-md w-full bg-cinema-gray/30 backdrop-blur-sm p-6 rounded-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('errors.oops')}
        </h2>
        
        <p className="text-gray-300 mb-4">
          {t('errors.something_went_wrong_try_again')}
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="mb-4 p-4 bg-red-900/20 rounded-lg">
            <p className="text-red-400 text-sm text-left font-mono break-all">
              {error.toString()}
            </p>
          </div>
        )}
        
        <div className="flex justify-center gap-4">
          <button
            onClick={resetError}
            className="inline-flex items-center gap-2 bg-cinema-red text-white 
                     px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('actions.try_again')}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-white/10 text-white 
                     px-6 py-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            {t('actions.reload_page')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;