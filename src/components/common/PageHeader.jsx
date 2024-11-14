// src/components/common/PageHeader.jsx
const PageHeader = ({ title, backgroundImage }) => {
    return (
      <div className="relative bg-cinema-dark">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          }}
        />
        <div className="relative container-custom py-12 md:py-16 lg:py-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>
    );
  };
  
  export default PageHeader;