# 🎬 CineMar

## 📝 Descripción
CineMar es una aplicación web moderna para la gestión y visualización de cartelera de cine. Desarrollada con tecnologías de última generación, ofrece una experiencia de usuario fluida y responsive para la consulta de películas, horarios y compra de entradas.

[Link a la Web](https://cine-mar.vercel.app/)

![Screenshot](./public/cinemarScreenshot.png)


## ✨ Características Principales
- 🏠 Página de inicio con carrusel de películas destacadas
- 🎥 Cartelera actualizada con filtros y búsqueda
- 🔜 Sección de próximos estrenos
- 🎫 Sistema de reserva de entradas
- 🌐 Soporte multiidioma (Español, Catalán, Inglés, Francés)
- 📱 Diseño responsive para todos los dispositivos
- 🎨 Interfaz moderna con animaciones fluidas
- 🗺️ Integración con mapas para ubicación del cine

## 🛠️ Tecnologías Utilizadas
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Estilos:** TailwindCSS
- **Routing:** React Router DOM
- **Gestión de Estado:** Zustand
- **Internacionalización:** i18next
- **Animaciones:** Framer Motion
- **Mapas:** Leaflet
- **Componentes UI:** Headless UI
- **Iconos:** Heroicons, Lucide React
- **Carrusel:** Swiper
- **Fechas:** date-fns

## 🎯 Integración con API

### API de TMDB (The Movie Database)
La aplicación utiliza la API de TMDB para obtener información actualizada sobre películas. 

#### Configuración de la API
Para configurar la API, necesitas las siguientes variables de entorno en tu archivo `.env`:
```env
VITE_API_KEY=tu_clave_api_tmdb
VITE_API_URL=https://api.themoviedb.org/3
VITE_IMAGE_URL=https://image.tmdb.org/t/p
```

#### Endpoints Principales
La aplicación interactúa con los siguientes endpoints:

1. **Películas en Cartelera**
```javascript
GET /movie/now_playing
// Parámetros: page, language, region
```

2. **Próximos Estrenos**
```javascript
GET /movie/upcoming
// Parámetros: page, language, region
```

3. **Detalles de Película**
```javascript
GET /movie/{movie_id}
// Parámetros: language
```

4. **Búsqueda de Películas**
```javascript
GET /search/movie
// Parámetros: query, page, language, region
```

5. **Videos de Película**
```javascript
GET /movie/{movie_id}/videos
// Parámetros: language
```

6. **Géneros de Películas**
```javascript
GET /genre/movie/list
// Parámetros: language
```

7. **Créditos de Película**
```javascript
GET /movie/{movie_id}/credits
// Parámetros: language
```

#### Características de la Integración
- 🌍 **Soporte Multiidioma:** Adaptación automática del contenido según el idioma seleccionado (es-ES, ca-ES, en-US, fr-FR)
- 🖼️ **Gestión de Imágenes:** Sistema de fallback para imágenes no disponibles
- 🔄 **Manejo de Errores:** Sistema robusto de gestión de errores en las peticiones
- 📱 **Optimización de Recursos:** Diferentes tamaños de imágenes según el dispositivo
- 🎫 **Sistema de Sesiones:** Simulación local de horarios y disponibilidad de entradas

### API de Sesiones (Mock)
La aplicación incluye una simulación de API para la gestión de sesiones de cine con:
- Horarios disponibles
- Formatos de proyección (2D/3D)
- Idiomas disponibles (ESP/VOSE)
- Capacidad de sala y asientos disponibles

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone [URL_del_repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` con las variables de entorno necesarias:
```env
VITE_API_KEY=tu_clave_api_tmdb
VITE_API_URL=https://api.themoviedb.org/3
VITE_IMAGE_URL=https://image.tmdb.org/t/p
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📁 Estructura del Proyecto
```
src/
├── assets/          # Recursos estáticos
├── components/      # Componentes reutilizables
│   ├── booking/     # Componentes de reserva
│   ├── common/      # Componentes comunes
│   ├── layout/      # Componentes de estructura
│   ├── movies/      # Componentes relacionados con películas
│   └── ui/          # Componentes de interfaz
├── hooks/           # Hooks personalizados
├── i18n/            # Configuración y archivos de internacionalización
├── pages/           # Páginas principales
├── services/        # Servicios y APIs
└── styles/          # Estilos globales
```

## 🔧 Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run lint`: Ejecuta el linter

## 🌐 Rutas Principales
- `/`: Página de inicio
- `/cartelera`: Listado de películas en cartelera
- `/pelicula/:id`: Detalles de película específica
- `/proximos-estrenos`: Próximos estrenos
- `/contacto`: Página de contacto

## 🎨 Características de UI/UX
- Diseño moderno y minimalista
- Animaciones suaves para mejorar la experiencia de usuario
- Sistema de notificaciones toast
- Carga progresiva de imágenes
- Skeletons para carga de contenido
- Diseño responsive para todos los tamaños de pantalla

## 🔍 SEO y Rendimiento
- Optimización de imágenes
- Lazy loading de componentes
- Meta tags dinámicos
- URLs amigables


