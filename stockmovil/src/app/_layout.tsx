import { Stack } from "expo-router";
import { TamaguiProvider, Theme } from 'tamagui'
import { useFonts } from 'expo-font'

import config from '../../tamagui.config'

export default function TabRoutesLayout() {

    const [loaded] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
      });

      if (!loaded) {
        return null;
      }
    return(

        <TamaguiProvider config={config} defaultTheme="dark_blue">
        <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
            name="(tabs)"
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="(login)"
            options={{
                headerShown: false,
            }}
        />
        </Stack>
        </TamaguiProvider>

    )

}