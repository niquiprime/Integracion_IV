import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export default function ButtonWelcome({ navigation }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={styles.buttonText}>Ingresar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0098D3",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
