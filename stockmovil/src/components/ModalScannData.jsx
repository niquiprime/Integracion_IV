import React from "react";
import { Modal, Text, View, StyleSheet, Button } from "react-native";

const ModalScannData = ({ data, visible, onClose }) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.productName}>{data.Nombre}</Text>
          <Text style={styles.productPrice}>Precio: ${data.Precio}</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ModalScannData;
