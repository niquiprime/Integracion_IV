import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import ModalScanndData from "../../components/ModalScannData"; // Importa tu componente modal
import FlashButton from "../../components/FlashButton"; // Importa tu componente de botón de flash

function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productData, setProductData] = useState(null); // Almacena los datos del producto
  const [isLoading, setIsLoading] = useState(false); // Controla la carga de datos

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsLoading(true); // Indica que se está realizando la solicitud al servidor
    fetch(`https://stockmovil-back.onrender.com/api/productos/codigo/${data}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Nombre + " " + data.CodigoBarras);
        setProductData(data); // Almacena los datos del producto en el estado
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Finaliza la carga de datos
      });
  };

  // Función para reiniciar el escaneo
  const restartScanning = () => {
    setScanned(false);
    setProductData(null);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {productData && ( // Renderiza el modal si hay datos del producto
        <ModalScanndData
          data={productData}
          visible={true}
          onClose={restartScanning} // Reinicia el escaneo al cerrar el modal
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default CameraComponent;
