import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Avatar } from "react-native-elements";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        source={{ uri: "URL_DE_TU_IMAGEN_DE_PERFIL" }}
        // Opcional: puedes usar la prop `icon` para mostrar un icono en lugar de una imagen
        // icon={{ name: "user", type: "font-awesome" }}
      />
      <View style={styles.infoContainer}>
        <Text h3>Nombre del Usuario</Text>
        <Text>Email: usuario@email.com</Text>
        <Text>RUT: 123456789</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default Profile;
