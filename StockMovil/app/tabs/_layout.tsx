import { Files, ScanBarcode, User2 } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

export default function TabRoutesLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <User2
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tabs.Screen
        name="cameraScreen"
        listeners={{
          tabPress: (e) => {
            console.log(e.data);
          }
        }}
        options={{
          headerShown: false,
          title: "Escanear",
          tabBarIcon: ({ color, size }) => (
            <ScanBarcode
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerShown: false,
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Files
              color={color}
              size={size}
            />
          )
        }}
      />
    </Tabs>
  );
}
