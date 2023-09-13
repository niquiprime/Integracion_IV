import { StyleSheet, Text, View, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import ButtonWelcome from "./ButtonWelcome";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Movil</Text>
      <ButtonWelcome navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
});
