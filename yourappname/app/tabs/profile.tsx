import React from "react";
import { Avatar, Text, YStack } from "tamagui";

const Profile = () => {
  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      space="$4"
    >
      <Avatar
        circular
        size="xlarge"
      >
        <Avatar.Image
          accessibilityLabel="Avatar"
          src="https://placekitten.com/200/300"
        />
        <Avatar.Fallback bc="red" />
      </Avatar>
      <YStack
        alignItems="center"
        space="$2"
      >
        <Text
          fontSize="$4"
          fontWeight="bold"
        >
          Nombre del Usuario
        </Text>
        <Text>Email: usuario@email.com</Text>
        <Text>RUT: 123456789</Text>
      </YStack>
    </YStack>
  );
};

export default Profile;
