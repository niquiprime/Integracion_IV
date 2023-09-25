import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";

const CameraComponent = () => {
  const handleBarCodeRead = (barcodes) => {
    if (barcodes.length > 0) {
      console.log("Código de barras leído:", barcodes[0].data);
      // Aquí puedes realizar acciones adicionales con el código de barras leído
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        onBarCodeRead={handleBarCodeRead}
        // Puedes configurar otras propiedades de la cámara aquí
      >
        <Text style={styles.capture}>Enfoque un código de barras...</Text>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
});

export default CameraComponent;
