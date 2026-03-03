# Estructura del Proyecto CD VyA

## Organización de Carpetas

```
src/
├── config/
│   ├── firebaseConfig.js          # Configuración de Firebase (auth, db, app)
│   └── appConfig.js                # Configuración de la aplicación (DEFAULT_CONFIG, MOCK_NEWS, MOCK_COMMENTS)
│
├── utils/
│   └── helpers.js                  # Funciones auxiliares (createMarkup, formatTimeAgo, formatDate)
│
├── components/
│   ├── Navbar.jsx                  # Barra de navegación
│   └── Toast.jsx                   # Sistema de notificaciones
│
├── App.jsx                         # Componente principal (pendiente de refactorizar)
├── App.css                         # Estilos personalizados
└── main.jsx                        # Punto de entrada
```

## Componentes Creados

### 1. **config/firebaseConfig.js**
Exporta:
- `app` - Instancia de Firebase
- `auth` - Servicio de autenticación
- `db` - Firestore database
- `appId` - ID de la aplicación

### 2. **config/appConfig.js**
Exporta:
- `DEFAULT_CONFIG` - Configuración por defecto del sitio
- `MOCK_NEWS` - Noticias de ejemplo
- `MOCK_COMMENTS` - Comentarios de ejemplo

### 3. **utils/helpers.js**
Funciones auxiliares:
- `createMarkup(html)` - Para renderizar HTML seguro
- `formatTimeAgo(timestamp)` - Formatear tiempo relativo
- `formatDate(timestamp)` - Formatear fecha

### 4. **components/Navbar.jsx**
Componente de navegación con:
- Menú responsive
- Modo oscuro/claro
- Navegación entre secciones
- Indicador de noticias recientes

### 5. **components/Toast.jsx**
Sistema de notificaciones flotantes

## Próximos Pasos para Modularizar

### Componentes Pendientes de Extraer de App.jsx:

#### Vistas Principales:
1. **components/views/LandingView.jsx**
   - Hero section
   - Estadísticas
   - Identidad
   - Campeonato
   - Sección de socios
   - Sección de donaciones

2. **components/views/AllNewsView.jsx**
   - Vista de todas las noticias

3. **components/views/RosterView.jsx**
   - Vista de plantilla (pendiente de implementar)

4. **components/views/AdminView.jsx**
   - Panel de administración
   - Editor de configuración
   - Gestión de noticias
   - Moderación de comentarios
   - Gestión de solicitudes de socios

#### Modales:
5. **components/modals/AuthModal.jsx**
   - Modal de autenticación (Google/Facebook)

6. **components/modals/NewsModal.jsx**
   - Modal lateral de noticias con comentarios

7. **components/modals/SocioModal.jsx**
   - Modal de solicitud de membresía

8. **components/modals/CommentModal.jsx**
   - Modal de comentarios generales

#### Secciones Reutilizables:
9. **components/sections/HeroSection.jsx**
10. **components/sections/StatsSection.jsx**
11. **components/sections/IdentitySection.jsx**
12. **components/sections/ChampionSection.jsx**
13. **components/sections/SocioSection.jsx**
14. **components/sections/DonationSection.jsx**

## Cómo Continuar la Refactorización

### Ejemplo para extraer un componente:

```javascript
// 1. Crear archivo: src/components/views/LandingView.jsx

import React from 'react';
import { Calendar, Users, Medal } from 'lucide-react';
import { createMarkup } from '../../utils/helpers';

export default function LandingView({ config, news, realUser, setAuthModal, setSocioModal }) {
    return (
        <div className="animate-fade-in">
            {/* Tu código aquí */}
        </div>
    );
}

// 2. En App.jsx, importar y usar:
import LandingView from './components/views/LandingView';

// 3. Reemplazar en el render:
{view === 'landing' && (
    <LandingView 
        config={config}
        news={news}
        realUser={realUser}
        setAuthModal={setAuthModal}
        setSocioModal={setSocioModal}
    />
)}
```

## Importaciones Necesarias

Al separar componentes, asegúrate de importar:

### De Firebase:
```javascript
import { auth, db, appId } from '../config/firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
```

### De Configuración:
```javascript
import { DEFAULT_CONFIG, MOCK_NEWS } from '../config/appConfig';
```

### De Utilidades:
```javascript
import { createMarkup, formatTimeAgo } from '../utils/helpers';
```

### De Iconos (según necesites):
```javascript
import { 
    Trophy, Calendar, Users, Medal, Heart, 
    UserPlus, Phone, Copy, Send, etc.
} from 'lucide-react';
```

## Estado Global vs Props

Para evitar prop drilling excesivo, considera:
1. **React Context** para estado compartido (auth, theme, config)
2. **Custom hooks** para lógica reutilizable
3. **Props** para comunicación padre-hijo directa

## Ejemplo de Context (Opcional):

```javascript
// src/context/AppContext.jsx
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [realUser, setRealUser] = useState(null);
    
    return (
        <AppContext.Provider value={{ theme, setTheme, realUser, setRealUser }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);
```

## Notas Importantes

- ✅ **Ya separados**: Firebase config, App config, Navbar, Toast, Helpers
- 🔄 **En App.jsx**: Vistas principales, Modales, AdminView (1800+ líneas)  
- 📝 **Mantener**: La funcionalidad exacta al separar
- 🎨 **CSS**: App.css tiene animaciones personalizadas, mantenerlo
- 🔥 **Firebase**: Todas las llamadas a Firebase deben importar de firebaseConfig.js

## Patrón Recomendado

1. Crear el componente en su carpeta correspondiente
2. Exportar como default
3. Importar en App.jsx
4. Probar que funcione igual
5. Eliminar código viejo de App.jsx

¡La base está lista! Ahora puedes continuar separando componentes según necesites. 🚀
