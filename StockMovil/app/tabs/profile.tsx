import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "@tamagui/lucide-icons";
import * as SecureStore from "expo-secure-store";
import { Avatar, H1, H2, Image, Text, View, XStack, YStack } from "tamagui";

import { LogOutBtn } from "../../components/LogOutBtn";
import { MyStack } from "../../components/MyStack";

const UserProfileCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getUser() {
      const usuario = await SecureStore.getItemAsync("usuario");
      console.log(usuario);
      // Parsear el JSON si es necesario
      setUserData(JSON.parse(usuario));
    }

    getUser();
  }, []);
  return (
    <MyStack>
      <XStack
        alignContent="space-between"
        justifyContent="space-between"
      >
        <H1
          fontSize="$8"
          fontWeight="bold"
          textAlign="left"
        >
          ¡Bienvenido, {userData?.nombre} {userData?.apellido}!
        </H1>
        <LogOutBtn />
      </XStack>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$4"
      >
        <Avatar
          circular
          size="xlarge"
        >
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80",
              width: 200,
              height: 200
            }}
          />
        </Avatar>
        <H2 fontSize="$5">Usuario: {userData?.usuario}</H2>

        {/* Social Links */}
        <XStack
          space="$4"
          alignItems="center"
        >
          <View alignItems="center">
            <Facebook
              size="xlarge"
              color="blue"
            />
            <Text
              fontSize="$3"
              fontWeight="bold"
            >
              Facebook
            </Text>
          </View>
          <View alignItems="center">
            <Twitter
              size="xlarge"
              color="blue"
            />
            <Text
              fontSize="$3"
              fontWeight="bold"
            >
              Twitter
            </Text>
          </View>
          <View alignItems="center">
            <Instagram
              size="xlarge"
              color="purple"
            />
            <Text
              fontSize="$3"
              fontWeight="bold"
            >
              Instagram
            </Text>
          </View>
          <View alignItems="center">
            <Linkedin
              size="xlarge"
              color="blue"
            />
            <Text
              fontSize="$3"
              fontWeight="bold"
            >
              LinkedIn
            </Text>
          </View>
        </XStack>

        {/* Otros detalles útiles */}
        <View
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="$3">Correo electrónico: {userData?.email}</Text>
          <Text fontSize="$3">RUT: {userData?.n_documento}</Text>
          <Text fontSize="$3">
            Fecha de nacimiento: {userData?.fec_Nacimiento}
          </Text>
        </View>
      </YStack>
    </MyStack>
  );
};

export default UserProfileCard;
