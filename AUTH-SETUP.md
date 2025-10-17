# 🔐 Configuración de Google Sign-In - Firebase

## ✅ Lo que ya está implementado:

- ✅ Contexto de autenticación (`AuthContext.tsx`)
- ✅ Pantalla de Login con Email/Password y Google
- ✅ Pantalla Home para usuarios autenticados
- ✅ Logout funcional
- ✅ Validaciones de formulario

---

## 🔥 Configurar Google Sign-In en Firebase Console

### **PASO 1: Habilitar Google Sign-In** (5 min)

1. Ve a [Firebase Console](https://console.firebase.google.com/project/fitnessapp-259ba)

2. En el menú lateral: **Build → Authentication**

3. Haz clic en la pestaña **"Métodos de acceso"** o **"Sign-in method"**

4. Busca **"Google"** en la lista de proveedores

5. Haz clic en **"Google"** para configurarlo

6. **Activa el interruptor** para habilitarlo

7. Configura:

   - **Nombre público del proyecto:** FitApp
   - **Correo de asistencia del proyecto:** Tu email

8. Haz clic en **"Guardar"**

✅ ¡Listo! Google Sign-In está habilitado.

---

### **PASO 2: Configurar dominios autorizados** (2 min)

1. Aún en **Authentication → Settings**

2. Ve a la sección **"Dominios autorizados"** (Authorized domains)

3. Asegúrate de que estén agregados:

   - ✅ `localhost` (para desarrollo local)
   - ✅ Tu dominio de producción (cuando lo tengas)

4. Para Expo/desarrollo, también necesitas:
   - ✅ `*.expo.dev` (puede que ya esté agregado)

---

### **PASO 3: Configurar OAuth 2.0 (Para producción)** (Opcional)

Si vas a deployar la app a producción:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)

2. Selecciona tu proyecto: **fitnessapp-259ba**

3. Menú → **APIs y servicios → Pantalla de consentimiento de OAuth**

4. Configura la información de la app:

   - Nombre de la aplicación: **FitApp**
   - Email de asistencia: Tu email
   - Logotipo (opcional)
   - Dominios autorizados

5. Guarda los cambios

---

## 🧪 Probar la Autenticación

### **Método 1: Email/Password**

1. Inicia la app: `npm start`
2. Presiona `w` para abrir en web
3. Haz clic en **"¿No tienes cuenta? Regístrate"**
4. Ingresa:
   - Email: `test@example.com`
   - Password: `password123` (mínimo 6 caracteres)
5. Haz clic en **"Registrarse"**
6. Deberías ser redirigido a la pantalla Home ✅

### **Método 2: Google Sign-In**

1. En la pantalla de Login
2. Haz clic en el botón **"Google"**
3. Se abrirá un popup de Google
4. Selecciona tu cuenta de Google
5. Acepta los permisos
6. Deberías ser redirigido a la pantalla Home ✅

---

## 🐛 Solución de Problemas

### Error: "Popup bloqueado"

**Solución:** Permite popups en tu navegador para `localhost`

### Error: "auth/popup-closed-by-user"

**Solución:** El usuario cerró el popup antes de completar el login. Es normal.

### Error: "auth/unauthorized-domain"

**Solución:**

1. Ve a Firebase Console → Authentication → Settings
2. Agrega el dominio a "Dominios autorizados"

### Error: "auth/operation-not-allowed"

**Solución:**

1. Ve a Firebase Console → Authentication
2. Verifica que Google esté habilitado

### Google Sign-In no aparece o no funciona

**Solución:**

1. Verifica que Firebase esté configurado correctamente
2. Limpia caché: `npx expo start -c`
3. Verifica las variables de entorno en `.env`

---

## 📱 Funcionalidades Implementadas

### ✅ Login Screen

- Login con Email/Password
- Registro con Email/Password
- Login con Google
- Validación de formularios
- Mensajes de error en español
- Toggle para mostrar/ocultar contraseña
- Loading states

### ✅ Home Screen

- Muestra información del usuario
- Muestra método de autenticación usado
- Estadísticas (preparadas para futuras features)
- Botón de logout
- UI responsive

### ✅ Auth Context

- Manejo centralizado de autenticación
- Estado global del usuario
- Funciones: signUp, signIn, signInWithGoogle, logout
- Persistencia de sesión automática

---

## 🎯 Próximas Features a Agregar

### Fase 1: Mejorar Autenticación

- [ ] Recuperación de contraseña
- [ ] Verificación de email
- [ ] Actualizar perfil de usuario
- [ ] Subir foto de perfil

### Fase 2: Navegación

- [ ] Instalar React Navigation
- [ ] Crear Tab Navigator (Home, Workouts, Profile)
- [ ] Agregar drawer navigation

### Fase 3: Workouts

- [ ] Crear pantalla de agregar workout
- [ ] Guardar workouts en Firestore
- [ ] Listar workouts del usuario
- [ ] Editar/eliminar workouts

### Fase 4: UI/UX

- [ ] Animaciones
- [ ] Dark mode
- [ ] Notificaciones
- [ ] Gráficas de progreso

---

## 🔒 Seguridad Implementada

- ✅ Variables de entorno para credenciales
- ✅ Validación de inputs
- ✅ Mensajes de error sin exponer información sensible
- ✅ Reglas de Firestore (configurar en Firebase Console)
- ✅ Dominios autorizados limitados

---

## 📚 Recursos

- [Firebase Auth Docs](https://firebase.google.com/docs/auth/web/start)
- [Google Sign-In Docs](https://firebase.google.com/docs/auth/web/google-signin)
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)

---

## ✅ Checklist de Configuración

- [ ] Google Sign-In habilitado en Firebase Console
- [ ] Dominios autorizados configurados
- [ ] Email/Password habilitado en Firebase Console
- [ ] Variables de entorno configuradas en `.env`
- [ ] App corriendo: `npm start`
- [ ] Probado login con Email/Password
- [ ] Probado login con Google
- [ ] Logout funciona correctamente

---

**Estado:** ✅ Todo implementado y listo para usar

**Próximo paso:** Iniciar la app y probar ambos métodos de autenticación.

```bash
npm start
# Presiona 'w' para web
```

¡Disfruta tu sistema de autenticación completo! 🎉
