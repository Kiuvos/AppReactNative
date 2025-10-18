import React from "react";
import { View } from "react-native";
import { Button, Menu, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  const getCurrentLanguageName = () => {
    const lang = i18n.language;
    return lang === "es" ? "Español" : "English";
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            icon="translate"
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            {getCurrentLanguageName()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => changeLanguage("es")}
          title="Español"
          leadingIcon={i18n.language === "es" ? "check" : undefined}
        />
        <Menu.Item
          onPress={() => changeLanguage("en")}
          title="English"
          leadingIcon={i18n.language === "en" ? "check" : undefined}
        />
      </Menu>
    </View>
  );
}
