import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'movies', href: '/cartelera' },
  { name: 'coming_soon', href: '/proximos-estrenos' },
  { name: 'contact', href: '/contacto' },
];

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation(['navigation']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
    const currentPath = window.location.pathname;
    navigate(currentPath);
  };

  const isActiveRoute = (path) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="bg-cinema-gray/80 backdrop-blur-md sticky top-0 z-[9999]">
        <nav className="container-custom" aria-label="Global">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex lg:flex-1">
              <Link 
                to="/" 
                className="-m-1.5 p-1.5 transition-transform hover:scale-105 duration-300"
              >
                <span className="sr-only">Cinemar</span>
                <img
                  className="h-10 w-auto"
                  src="/cinemar-logo.png"
                  alt="Cinemar"
                />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">{t('actions.open_menu')}</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link text-sm font-semibold leading-6 relative px-1 py-2
                    transition-all duration-300 hover:text-white
                    ${isActiveRoute(item.href) 
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-cinema-red' 
                      : 'text-gray-300'}`}
                >
                  {t(`menu.${item.name}`)}
                </Link>
              ))}
            </div>

            {/* Language selector */}
            <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`nav-link text-sm font-semibold transition-colors duration-300
                    ${i18n.language === lang.code 
                      ? 'text-white bg-cinema-red/20 px-3 py-1 rounded-full' 
                      : 'text-gray-300 hover:text-white px-3 py-1'}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu portal - Outside header */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu content */}
          <div className="fixed inset-y-0 right-0 z-[9999] w-full overflow-y-auto bg-cinema-gray/20 backdrop-blur-md px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link 
                to="/" 
                className="-m-1.5 p-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cinemar</span>
                <img
                  className="h-8 w-auto"
                  src="/cinemar-logo.png"
                  alt="Cinemar"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">{t('actions.close_menu')}</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 nav-link
                        transition-colors duration-300
                        ${isActiveRoute(item.href) 
                          ? 'text-white bg-cinema-red/20' 
                          : 'text-gray-300 hover:bg-gray-800'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(`menu.${item.name}`)}
                    </Link>
                  ))}
                </div>
                <div className="py-6 flex gap-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`nav-link text-base font-semibold transition-colors duration-300
                        ${i18n.language === lang.code 
                          ? 'text-white bg-cinema-red/20 px-4 py-2 rounded-full' 
                          : 'text-gray-300 hover:text-white px-4 py-2'}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
