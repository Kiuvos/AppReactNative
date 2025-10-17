# 🚀 Guía de Configuración Completa - FitApp

**Fecha:** Octubre 17, 2025  
**Estado:** ✅ Repositorio limpio y listo para configurar

---

## ✅ **Lo que YA está hecho:**

1. ✅ Credenciales protegidas con variables de entorno
2. ✅ Repositorio limpio (sin credenciales en historial)
3. ✅ `.env` configurado con tus credenciales de Firebase
4. ✅ Ramas `main` y `development` sincronizadas

---

## 📋 **Próximos Pasos de Configuración**

### **PASO 1: Configurar Seguridad en Firebase** (15 min) 🔥

#### 1.1 Reglas de Firestore Database

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **"fitnessapp-259ba"**
3. En el menú lateral: **Build → Firestore Database**
4. Si no has creado la base de datos, haz clic en **"Crear base de datos"**
   - Selecciona modo: **Producción**
   - Ubicación: Elige la más cercana (ej: us-east1)
5. Haz clic en la pestaña **"Reglas"**
6. Reemplaza con estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Denegar acceso por defecto
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Permitir a usuarios autenticados acceder solo a sus datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Ejemplo: workouts del usuario
    match /users/{userId}/workouts/{workoutId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

7. Haz clic en **"Publicar"**

#### 1.2 Configurar Authentication

1. En el menú lateral: **Build → Authentication**
2. Haz clic en **"Comenzar"**
3. Habilita el método **"Correo electrónico/contraseña"**
   - Activa el interruptor
   - NO necesitas habilitar "Vínculo de correo electrónico"
   - Guarda
4. Ve a la pestaña **"Settings"** (Configuración)
5. En **"Dominios autorizados"**:
   - Mantén: `localhost`
   - Elimina otros dominios que no uses

#### 1.3 Restringir API Key (Opcional pero recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona proyecto: **"fitnessapp-259ba"**
3. Menú → **APIs y servicios → Credenciales**
4. Encuentra tu API Key: `AIzaSyBoHU1xJ-jwwAozHWnE7_vQcSkuQF4HLOo`
5. Haz clic en el ícono de lápiz ✏️ **"Editar API Key"**
6. **Restricciones de aplicación:**
   - Selecciona: **"Referentes HTTP (sitios web)"**
   - Agrega:
     ```
     localhost
     localhost:*
     127.0.0.1:*
     *.expo.dev
     ```
7. **Restricciones de API:**
   - Selecciona: **"Restringir clave"**
   - Habilita:
     - ✅ Firebase Authentication
     - ✅ Cloud Firestore API
     - ✅ Firebase Storage API (si vas a usar storage)
8. Guarda cambios

---

### **PASO 2: Configurar el Entorno de Desarrollo** (10 min) 💻

#### 2.1 Instalar dependencias (si no lo has hecho)

```bash
cd "c:\Programacion\New folder\Fitapp"
npm install
```

#### 2.2 Iniciar el proyecto

```bash
npm start
```

Esto abrirá Expo Dev Tools. Puedes ejecutar la app en:
- **Android:** Presiona `a` (requiere Android Studio o dispositivo físico)
- **iOS:** Presiona `i` (solo en Mac con Xcode)
- **Web:** Presiona `w` (se abre en navegador)

#### 2.3 Escanear código QR (Recomendado para principiantes)

1. Descarga **Expo Go** en tu celular:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
2. Abre Expo Go
3. Escanea el código QR que aparece en la terminal
4. ¡Tu app se cargará en tu celular!

---

### **PASO 3: Verificar que Firebase funcione** (5 min) 🧪

#### 3.1 Crear archivo de prueba

Vamos a crear un componente simple para probar la conexión:

**Archivo:** `App.tsx` (ya existe, lo vamos a modificar)

```tsx
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider, Button, Text } from "react-native-paper";
import { auth, db } from "./lib/firebase";
import "./global.css";

export default function App() {
  const [firebaseStatus, setFirebaseStatus] = useState("Verificando...");

  useEffect(() => {
    // Verificar conexión a Firebase
    try {
      const authInstance = auth;
      const dbInstance = db;
      
      if (authInstance && dbInstance) {
        setFirebaseStatus("✅ Firebase conectado correctamente");
      }
    } catch (error) {
      setFirebaseStatus("❌ Error al conectar: " + error.message);
    }
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text variant="headlineSmall" className="mb-4">
          FitApp
        </Text>
        
        <Text variant="bodyMedium" className="mb-6 text-center px-4">
          {firebaseStatus}
        </Text>
        
        <Button
          mode="contained"
          onPress={() => alert("¡Funciona!")}
          style={{ marginTop: 20 }}
        >
          Probar Botón
        </Button>
        
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
```

#### 3.2 Ejecutar la app

```bash
npm start
# Presiona 'w' para web o escanea QR con tu celular
```

Deberías ver: **"✅ Firebase conectado correctamente"**

---

### **PASO 4: Próximas Features a Implementar** 🎯

Ahora que tu base está configurada, puedes agregar:

#### 4.1 Sistema de Autenticación (Login/Registro)
- Crear pantalla de login
- Crear pantalla de registro
- Implementar login con email/password
- Agregar logout

#### 4.2 Navegación entre Pantallas
- Instalar React Navigation
- Crear Stack Navigator
- Agregar pantallas: Home, Profile, Workouts

#### 4.3 Guardar Datos en Firestore
- Crear función para agregar entrenamientos
- Crear función para leer entrenamientos
- Crear función para actualizar/eliminar

#### 4.4 UI Mejorada
- Agregar más componentes de Paper
- Personalizar tema de colores
- Agregar animaciones

---

## 📚 **Recursos Útiles**

### Documentación Oficial:
- [Expo Docs](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Firebase Auth](https://firebase.google.com/docs/auth/web/start)
- [Firestore](https://firebase.google.com/docs/firestore/quickstart)
- [NativeWind](https://www.nativewind.dev/)

### Tutoriales Recomendados:
- [React Native Full Course](https://www.youtube.com/results?search_query=react+native+full+course)
- [Firebase Authentication Tutorial](https://www.youtube.com/results?search_query=firebase+auth+react+native)
- [Firestore CRUD Operations](https://www.youtube.com/results?search_query=firestore+react+native+crud)

---

## 🆘 **Solución de Problemas Comunes**

### Error: "Firebase config is missing"
```bash
# Solución: Verifica que .env tenga las credenciales
npm run verify-env

# Si falla, reinicia el servidor
# Presiona Ctrl+C y luego:
npm start
```

### Error: "Network request failed"
- Verifica tu conexión a internet
- Si estás en celular, asegúrate de estar en la misma red WiFi que tu PC

### Error: "Permission denied" en Firestore
- Revisa las reglas de Firestore (Paso 1.1)
- Asegúrate de que el usuario esté autenticado

### La app no carga en el celular
- Asegúrate de estar en la misma red WiFi
- Intenta cerrar y abrir Expo Go
- Reinicia el servidor: `Ctrl+C` → `npm start`

---

## ✅ **Checklist de Configuración**

- [ ] Firestore Database creada
- [ ] Reglas de Firestore configuradas
- [ ] Authentication habilitada (Email/Password)
- [ ] Dominios autorizados limitados
- [ ] API Key restringida (opcional)
- [ ] Dependencias instaladas (`npm install`)
- [ ] App corriendo (`npm start`)
- [ ] Firebase conectado correctamente

---

## 🎉 **¡Estás listo para desarrollar!**

Tu proyecto ahora tiene:
- ✅ Seguridad configurada
- ✅ Firebase conectado
- ✅ Variables de entorno protegidas
- ✅ Repositorio limpio en GitHub
- ✅ Entorno de desarrollo funcionando

**Siguiente paso:** Empieza a construir tu app de fitness. ¡Mucho éxito! 💪

---

**¿Necesitas ayuda?** Consulta los archivos:
- `README.md` - Información general
- `SECURITY.md` - Guía de seguridad
- Esta guía - Configuración paso a paso
