import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PageHeader from "../components/common/PageHeader";
import L from 'leaflet';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  FilmIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const position = [42.26482, 3.17571];

const ContactItem = ({ icon: Icon, title, children }) => (
  <div className="flex items-start space-x-4 p-4 bg-cinema-gray-600 rounded-lg transition-transform hover:transform hover:scale-105">
    <div className="flex-shrink-0">
      <Icon className="h-6 w-6 text-cinema-red-500" />
    </div>
    <div>
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      {children}
    </div>
  </div>
);

const InputField = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-gray-300 font-medium mb-2">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-cinema-dark-500 border border-cinema-gray-300 rounded-lg 
                 text-white placeholder-gray-500 focus:outline-none focus:border-cinema-red-500
                 focus:ring-1 focus:ring-cinema-red-500 transition-colors"
      />
    </div>
  </div>
);

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSending(false);
    setSent(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-cinema-dark-500">
      <PageHeader title={t('contact:title')} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cinema-red-600 to-cinema-red-800 rounded-lg p-8 mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t('contact:banner.title')}</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              {t('contact:banner.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ContactItem icon={MapPinIcon} title={t('contact:info.location.title')}>
              <p className="text-gray-300">{t('contact:info.location.address1')}</p>
              <p className="text-gray-300">{t('contact:info.location.address2')}</p>
            </ContactItem>

            <ContactItem icon={PhoneIcon} title={t('contact:info.phone.title')}>
              <p className="text-gray-300">{t('contact:info.phone.number')}</p>
              <p className="text-gray-300 text-sm">{t('contact:info.phone.subtitle')}</p>
            </ContactItem>

            <ContactItem icon={EnvelopeIcon} title={t('contact:info.email.title')}>
              <p className="text-gray-300">{t('contact:info.email.address')}</p>
              <p className="text-gray-300 text-sm">{t('contact:info.email.response')}</p>
            </ContactItem>

            <ContactItem icon={ClockIcon} title={t('contact:info.schedule.title')}>
              <p className="text-gray-300">{t('contact:info.schedule.weekdays')}</p>
              <p className="text-gray-300">{t('contact:info.schedule.weekend')}</p>
            </ContactItem>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-cinema-gray-500 rounded-lg overflow-hidden shadow-lg h-[500px]">
              <MapContainer 
                center={position} 
                zoom={16} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>
                    Cinemes Roses<br/>
                    {t('contact:info.location.address1')}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="bg-cinema-gray-500 p-8 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <FilmIcon className="h-8 w-8 text-cinema-red-500" />
                <h2 className="text-2xl font-bold text-white">{t('contact:form.title')}</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    icon={UserIcon}
                    label={t('contact:form.name.label')}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact:form.name.placeholder')}
                  />

                  <InputField
                    icon={EnvelopeIcon}
                    label={t('contact:form.email.label')}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={t('contact:form.email.placeholder')}
                  />
                </div>

                <InputField
                  icon={ChatBubbleBottomCenterTextIcon}
                  label={t('contact:form.subject.label')}
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={t('contact:form.subject.placeholder')}
                />

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    {t('contact:form.message.label')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder={t('contact:form.message.placeholder')}
                    className="w-full px-4 py-2 bg-cinema-dark-500 border border-cinema-gray-300 rounded-lg 
                             text-white placeholder-gray-500 focus:outline-none focus:border-cinema-red-500
                             focus:ring-1 focus:ring-cinema-red-500 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`flex items-center space-x-2 px-6 py-3 bg-cinema-red-500 text-white rounded-lg font-medium
                             transition-all ${sending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cinema-red-600 hover:transform hover:scale-105'}`}
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                    <span>{sending ? t('contact:form.sending') : t('contact:form.submit')}</span>
                  </button>

                  {sent && (
                    <div className="flex items-center space-x-2 text-green-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{t('contact:form.success')}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
