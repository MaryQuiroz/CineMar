import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation('footer');

  const socials = [
    { name: t('social.facebook'), href: '#', icon: 'facebook' },
    { name: t('social.instagram'), href: '#', icon: 'instagram' },
    { name: t('social.twitter'), href: '#', icon: 'twitter' },
  ];

  const legal = [
    { name: t('legal.legal_notice'), href: '/aviso-legal' },
    { name: t('legal.privacy_policy'), href: '/privacidad' },
    { name: t('legal.cookie_policy'), href: '/cookies' },
  ];

  return (
    <footer className="bg-cinema-gray mt-auto">
      <div className="container-custom px-4 py-6 md:px-6 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('social.title')}</h3>
            <div className="flex flex-col space-y-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="nav-link flex items-center space-x-3 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`w-5 h-5 ${social.icon}`} />
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('legal.title')}</h3>
            <div className="flex flex-col space-y-3">
              {legal.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="nav-link hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('contact.title')}</h3>
            <address className="not-italic flex flex-col space-y-3 text-gray-300">
              <p>{t('contact.address.street')}</p>
              <p>{t('contact.address.city')}</p>
              <a 
                href="tel:972154646" 
                className="nav-link hover:text-white transition-colors duration-200"
              >
                {t('contact.phone')}
              </a>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 md:pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400 text-center px-4">
            {t('copyright.text', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
