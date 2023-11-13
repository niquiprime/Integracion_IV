import React from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button } from "tamagui";

export default function LogOut() {
  const router = useRouter();
  const handleLogOut = async () => {
    await SecureStore.deleteItemAsync("usuario");
    await SecureStore.deleteItemAsync("token");
    router.push("/");
  };
  return (
    <Button
      theme="alt1"
      aria-label="Close"
      onPress={handleLogOut}
    >
      Cerrar Sesión
    </Button>
  );
}
