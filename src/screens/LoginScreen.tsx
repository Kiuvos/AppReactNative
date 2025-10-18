import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Divider,
  HelperText,
  Card,
} from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, signUp, signInWithGoogle } = useAuth();

  // Validación de email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Manejar login o registro
  const handleSubmit = async () => {
    setError("");

    // Validaciones
    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error: any) {
      // Mensajes de error en español
      if (error.message.includes("auth/user-not-found")) {
        setError("Usuario no encontrado");
      } else if (error.message.includes("auth/wrong-password")) {
        setError("Contraseña incorrecta");
      } else if (error.message.includes("auth/email-already-in-use")) {
        setError("Este email ya está registrado");
      } else if (error.message.includes("auth/weak-password")) {
        setError("La contraseña es muy débil");
      } else if (error.message.includes("auth/invalid-email")) {
        setError("Email inválido");
      } else if (error.message.includes("auth/invalid-credential")) {
        setError("Credenciales inválidas. Verifica tu email y contraseña");
      } else {
        setError(error.message || "Ocurrió un error. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar login con Google
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.message.includes("popup-closed-by-user")) {
        setError("Login cancelado");
      } else if (error.message.includes("popup-blocked")) {
        setError("Por favor permite popups en tu navegador");
      } else {
        setError("Error al iniciar sesión con Google");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="flex-1 justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md">
          {/* Logo o título */}
          <View className="items-center mb-8">
            <Text variant="displaySmall" className="font-bold text-indigo-600">
              💪 FitApp
            </Text>
            <Text variant="bodyLarge" className="text-gray-600 mt-2">
              {isLogin
                ? "Inicia sesión para continuar"
                : "Crea tu cuenta gratuita"}
            </Text>
          </View>

          {/* Card del formulario */}
          <Card className="p-6">
            <Card.Content>
              {/* Campo de Email */}
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                left={<TextInput.Icon icon="email" />}
                disabled={loading}
                className="mb-4"
              />

              {/* Campo de Contraseña */}
              <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                disabled={loading}
                className="mb-2"
              />

              {/* Mensaje de error */}
              {error ? (
                <HelperText type="error" visible={!!error} className="mb-2">
                  {error}
                </HelperText>
              ) : null}

              {/* Botón de Login/Registro */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
                className="mt-4"
                contentStyle={{ paddingVertical: 8 }}
              >
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
              </Button>

              {/* Cambiar entre Login y Registro */}
              <Button
                mode="text"
                onPress={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                disabled={loading}
                className="mt-2"
              >
                {isLogin
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </Button>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <Divider className="flex-1" />
                <Text className="mx-4 text-gray-500">O continúa con</Text>
                <Divider className="flex-1" />
              </View>

              {/* Botón de Google */}
              <Button
                mode="outlined"
                onPress={handleGoogleSignIn}
                loading={loading}
                disabled={loading}
                icon="google"
                contentStyle={{ paddingVertical: 8 }}
              >
                Google
              </Button>
            </Card.Content>
          </Card>

          {/* Footer */}
          <Text variant="bodySmall" className="text-center text-gray-500 mt-6">
            Al continuar, aceptas nuestros Términos y Condiciones
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
