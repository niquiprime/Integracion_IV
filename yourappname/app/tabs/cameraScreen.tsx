import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRouter } from "expo-router";
import { Text, YStack } from "tamagui";

function CameraComponent() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) {
      return; // Evita escanear nuevamente si ya ha sido escaneado
    }

    setIsLoading(true);

    fetch(`https://stockmovil-back.onrender.com/api/productos/codigo/${data}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Nombre + " " + data.CodigoBarras);
        setProductData(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setScanned(true); // Establece scanned en true después de completar la solicitud
        console.log("setScanned: " + scanned);
        router.push({
          pathname: "/productDetail/[product]",
          params: {
            nombre: productData.Nombre,
            codigo: productData.CodigoBarras
          }
        });
      });
  };

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="black"
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1, width: "100%" }}
      />
    </YStack>
  );
}

export default CameraComponent;
