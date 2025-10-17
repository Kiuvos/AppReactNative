// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider, Button, Text } from "react-native-paper";
import "./global.css"; // importa Tailwind CSS (NativeWind)

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text variant="headlineSmall">Hola — Expo + NativeWind + Paper</Text>
        <Button
          mode="contained"
          onPress={() => alert("¡Funciona!")}
          style={{ marginTop: 20 }}
        >
          Presióname
        </Button>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}
