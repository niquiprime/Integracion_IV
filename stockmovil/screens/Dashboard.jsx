import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const Dashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Perfil"
          onPress={() => {
            // Agrega la lógica de navegación a la pantalla de perfil
            navigation.navigate("Profile");
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cámara"
          onPress={() => {
            // Agrega la lógica de navegación a la pantalla de cámara
            navigation.navigate("Camera");
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Productos"
          onPress={() => {
            // Agrega la lógica de navegación a la pantalla de todos los productos
            navigation.navigate("SearchProduct");
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 20,
  },
});

export default Dashboard;
