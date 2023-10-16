import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "@tamagui/lucide-icons";
import { Avatar, H2, Text, View, XStack, YStack } from "tamagui";

const UserProfileCard = () => {
  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Avatar
        size="xlarge"
        circular
      />
      <H2>Nombre del Usuario</H2>
      <Text color="gray">Descripción breve o bio del usuario</Text>

      {/* Social Links */}
      <XStack space="$4">
        <View>
          <Facebook
            size="xlarge"
            color="blue"
          />
          <Text>Facebook</Text>
        </View>
        <View>
          <Twitter
            size="xlarge"
            color="blue"
          />
          <Text>Twitter</Text>
        </View>
        <View>
          <Instagram
            size="xlarge"
            color="blue"
          />
          <Text>Instagram</Text>
        </View>
        <View>
          <Linkedin
            size="xlarge"
            color="blue"
          />
          <Text>LinkedIn</Text>
        </View>
      </XStack>

      {/* Otros detalles útiles */}
      <View>
        <Text>Correo electrónico: usuario@email.com</Text>
        <Text>Teléfono: (123) 456-7890</Text>
        <Text>Dirección: 123 Street, City</Text>
      </View>
    </YStack>
  );
};

export default UserProfileCard;
