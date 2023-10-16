import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "@tamagui/lucide-icons";
import { Avatar, H2, Image, Text, View, XStack, YStack } from "tamagui";

const UserProfileCard = () => {
  return (
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
      <H2
        fontSize="$5"
        fontWeight="bold"
      >
        Nombre del Usuario
      </H2>

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
            color="textSecondary"
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
            color="textSecondary"
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
            color="textSecondary"
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
            color="textSecondary"
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
        <Text
          fontSize="$3"
          color="textSecondary"
        >
          Correo electrónico: usuario@email.com
        </Text>
        <Text
          fontSize="$3"
          color="textSecondary"
        >
          Teléfono: (123) 456-7890
        </Text>
        <Text
          fontSize="$3"
          color="textSecondary"
        >
          Dirección: 123 Street, City
        </Text>
      </View>
    </YStack>
  );
};

export default UserProfileCard;
