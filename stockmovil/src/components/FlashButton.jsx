import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Platform, PermissionsAndroid } from "react-native";
import { Camera } from "expo-camera";

function FlashButton() {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (Platform.OS === "android") {
        const cameraPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        setHasCameraPermission(
          cameraPermission === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        const { status } = await Camera.requestPermissionsAsync();
        setHasCameraPermission(status === "granted");
      }
    };

    getCameraPermission();
  }, []);

  const toggleFlash = async () => {
    if (hasCameraPermission) {
      setIsTorchOn(!isTorchOn);
      await Camera.setFlashModeAsync(
        isTorchOn
          ? Camera.Constants.FlashMode.off
          : Camera.Constants.FlashMode.torch
      );
    }
  };

  return (
    <Button
      title={`Flash: ${isTorchOn ? "Apagar" : "Encender"}`}
      onPress={toggleFlash}
      style={styles.flashButton}
    />
  );
}

const styles = StyleSheet.create({
  flashButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});

export default FlashButton;
