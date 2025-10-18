import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Card, Avatar, Divider } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import LanguageSelector from "../components/LanguageSelector";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Obtener iniciales del email
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-6 py-8">
        {/* Header con información del usuario */}
        <Card className="mb-6">
          <Card.Content>
            <View className="flex-row items-center">
              <Avatar.Text
                size={64}
                label={getInitials(user?.email || "U")}
                className="bg-indigo-500"
              />
              <View className="ml-4 flex-1">
                <Text variant="headlineSmall" className="font-bold">
                  {t("home.welcome")} 👋
                </Text>
                <Text variant="bodyMedium" className="text-gray-600 mt-1">
                  {user?.email}
                </Text>
                {user?.displayName && (
                  <Text variant="bodySmall" className="text-gray-500">
                    {user.displayName}
                  </Text>
                )}
              </View>
            </View>

            <Divider className="my-4" />

            {/* Información adicional */}
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text variant="bodyMedium" className="text-gray-600">
                  {t("home.provider")}:
                </Text>
                <Text variant="bodyMedium" className="font-semibold">
                  {user?.providerData[0]?.providerId === "google.com"
                    ? "Google"
                    : "Email/Password"}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text variant="bodyMedium" className="text-gray-600">
                  {t("home.emailVerified")}:
                </Text>
                <Text variant="bodyMedium" className="font-semibold">
                  {user?.emailVerified ? `✅ ${t("home.yes")}` : `❌ ${t("home.no")}`}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text variant="bodyMedium" className="text-gray-600">
                  UID:
                </Text>
                <Text
                  variant="bodySmall"
                  className="font-mono text-gray-500"
                  numberOfLines={1}
                >
                  {user?.uid.substring(0, 20)}...
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Cards de features */}
        <Text variant="titleLarge" className="font-bold mb-4">
          {t("home.workouts")}
        </Text>

        <Card className="mb-4">
          <Card.Content>
            <View className="items-center py-8">
              <Text
                variant="displayMedium"
                className="text-indigo-500 font-bold"
              >
                💪
              </Text>
              <Text variant="titleMedium" className="mt-4 text-center">
                {t("home.noWorkouts")}
              </Text>
              <Text
                variant="bodyMedium"
                className="text-gray-600 text-center mt-2"
              >
                {t("home.noWorkoutsDesc")}
              </Text>
              <Button mode="contained" className="mt-6">
                {t("home.addWorkout")}
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Estadísticas de ejemplo */}
        <Text variant="titleLarge" className="font-bold mb-4 mt-4">
          {t("home.statistics")}
        </Text>

        <View className="flex-row justify-between mb-6">
          <Card className="flex-1 mr-2">
            <Card.Content>
              <Text variant="headlineMedium" className="font-bold text-center">
                0
              </Text>
              <Text
                variant="bodySmall"
                className="text-gray-600 text-center mt-1"
              >
                {t("home.workoutsCount")}
              </Text>
            </Card.Content>
          </Card>

          <Card className="flex-1 ml-2">
            <Card.Content>
              <Text variant="headlineMedium" className="font-bold text-center">
                0
              </Text>
              <Text
                variant="bodySmall"
                className="text-gray-600 text-center mt-1"
              >
                {t("home.activeDays")}
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Selector de idioma */}
        <Text variant="titleLarge" className="font-bold mb-4 mt-4">
          {t("settings.language")}
        </Text>
        <LanguageSelector />

        {/* Botón de cerrar sesión */}
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon="logout"
          className="mt-4"
          contentStyle={{ paddingVertical: 8 }}
        >
          {t("auth.logout")}
        </Button>
      </View>
    </ScrollView>
  );
}
