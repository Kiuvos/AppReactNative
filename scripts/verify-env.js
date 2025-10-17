/**
 * Script de verificación de variables de entorno
 * Ejecuta este script para asegurarte de que todas las variables necesarias están configuradas
 */

const requiredEnvVars = [
  "EXPO_PUBLIC_FIREBASE_API_KEY",
  "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
  "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "EXPO_PUBLIC_FIREBASE_APP_ID",
  "EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID",
];

console.log("🔍 Verificando variables de entorno...\n");

let allPresent = true;
const missing = [];

requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value || value === "tu_api_key_aqui" || value.includes("tu_")) {
    console.log(`❌ ${varName}: NO CONFIGURADA o usa valor de ejemplo`);
    missing.push(varName);
    allPresent = false;
  } else {
    console.log(`✅ ${varName}: Configurada`);
  }
});

console.log("\n" + "=".repeat(50));

if (allPresent) {
  console.log(
    "✅ ¡Todas las variables de entorno están configuradas correctamente!"
  );
  console.log("\nPuedes iniciar la aplicación con:");
  console.log("  npm start");
} else {
  console.log("❌ Faltan variables de entorno por configurar:\n");
  missing.forEach((varName) => {
    console.log(`   - ${varName}`);
  });
  console.log("\n📝 Instrucciones:");
  console.log("   1. Copia .env.example a .env");
  console.log("   2. Edita .env con tus credenciales de Firebase");
  console.log(
    "   3. Ejecuta este script nuevamente: node scripts/verify-env.js"
  );
  process.exit(1);
}
