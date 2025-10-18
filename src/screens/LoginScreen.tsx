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
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const { t } = useTranslation();
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
      setError(t("auth.errors.emptyFields"));
      return;
    }

    if (!isValidEmail(email)) {
      setError(t("auth.errors.invalidEmail"));
      return;
    }

    if (password.length < 6) {
      setError(t("auth.errors.weakPassword"));
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
      // Mensajes de error traducidos
      if (error.message.includes("auth/user-not-found")) {
        setError(t("auth.errors.userNotFound"));
      } else if (error.message.includes("auth/wrong-password")) {
        setError(t("auth.errors.wrongPassword"));
      } else if (error.message.includes("auth/email-already-in-use")) {
        setError(t("auth.errors.emailInUse"));
      } else if (error.message.includes("auth/weak-password")) {
        setError(t("auth.errors.weakPassword"));
      } else if (error.message.includes("auth/invalid-email")) {
        setError(t("auth.errors.invalidEmail"));
      } else if (error.message.includes("auth/invalid-credential")) {
        setError(t("auth.errors.invalidCredentials"));
      } else {
        setError(t("auth.errors.generic"));
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
        setError(t("auth.errors.popupClosed"));
      } else if (error.message.includes("popup-blocked")) {
        setError(t("auth.errors.popupBlocked"));
      } else {
        setError(t("auth.errors.googleError"));
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
              💪 {t("common.appName")}
            </Text>
            <Text variant="bodyLarge" className="text-gray-600 mt-2">
              {isLogin ? t("auth.loginTitle") : t("auth.registerTitle")}
            </Text>
          </View>

          {/* Card del formulario */}
          <Card className="p-6">
            <Card.Content>
              {/* Campo de Email */}
              <TextInput
                label={t("auth.email")}
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
                label={t("auth.password")}
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
                {isLogin ? t("auth.login") : t("auth.register")}
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
                {isLogin ? t("auth.noAccount") : t("auth.haveAccount")}
              </Button>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <Divider className="flex-1" />
                <Text className="mx-4 text-gray-500">{t("auth.continueWith")}</Text>
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
            {t("auth.termsAndConditions")}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
