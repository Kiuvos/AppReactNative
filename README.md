# FitApp

Aplicación de fitness desarrollada con React Native y Expo.

## 🔧 Tecnologías

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma para desarrollo React Native
- **TypeScript** - JavaScript con tipado estático
- **Firebase** - Backend (Authentication + Firestore)
- **NativeWind** - Tailwind CSS para React Native
- **React Native Paper** - Componentes UI Material Design

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI (se instala automáticamente)
- Cuenta de Firebase

## 🚀 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <url-del-repositorio>
   cd Fitapp
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Copia el archivo `.env.example` y crea tu propio `.env`:

   ```bash
   cp .env.example .env
   ```

   Edita el archivo `.env` con tus credenciales de Firebase:

   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=tu_api_key_aqui
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_bucket.firebasestorage.app
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=tu_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=tu_measurement_id
   ```

4. **Inicia la aplicación:**
   ```bash
   npm start
   ```

## 📱 Comandos Disponibles

- `npm start` - Inicia el servidor de desarrollo Expo
- `npm run android` - Ejecuta la app en Android
- `npm run ios` - Ejecuta la app en iOS (solo en macOS)
- `npm run web` - Ejecuta la app en el navegador

## 🔐 Seguridad

### Variables de Entorno

Este proyecto usa variables de entorno para proteger datos sensibles como las credenciales de Firebase.

**⚠️ IMPORTANTE:**

- **NUNCA** subas el archivo `.env` a Git
- **SIEMPRE** usa `.env.example` como plantilla
- Las variables deben empezar con `EXPO_PUBLIC_` para ser accesibles en el cliente

### Buenas Prácticas

1. **No expongas secretos en el código fuente**
2. **Usa `.gitignore`** para excluir archivos sensibles
3. **Rota tus API Keys** si fueron expuestas accidentalmente
4. **Configura reglas de seguridad** en Firebase Console

## 📁 Estructura del Proyecto

```
Fitapp/
├── App.tsx                 # Componente principal
├── index.ts                # Punto de entrada
├── global.css              # Estilos Tailwind
├── .env                    # Variables de entorno (NO SUBIR A GIT)
├── .env.example            # Plantilla de variables de entorno
├── lib/
│   └── firebase.ts         # Configuración de Firebase
├── assets/                 # Imágenes e íconos
└── package.json            # Dependencias del proyecto
```

## 🔥 Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Agrega una aplicación web
4. Copia las credenciales al archivo `.env`
5. Habilita Authentication y Firestore en la consola

## 📚 Recursos

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnavigation.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📄 Licencia

Este proyecto es privado.
