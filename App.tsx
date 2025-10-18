import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import "./src/i18n"; // Importar configuración de i18n
import "./global.css"; // importa Tailwind CSS (NativeWind)

// Componente que maneja la navegación basada en autenticación
function AppContent() {
  const { user, loading } = useAuth();

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text variant="bodyLarge" className="mt-4 text-gray-600">
          Cargando...
        </Text>
      </View>
    );
  }

  // Si hay usuario autenticado, mostrar Home, sino mostrar Login
  return user ? <HomeScreen /> : <LoginScreen />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthProvider>
          <AppContent />
          <StatusBar style="auto" />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
