import React, { useEffect, useState } from "react";
import { X } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "@react-navigation/native";
import {
  Adapt,
  Button,
  Dialog,
  PortalProvider,
  Sheet,
  Spinner,
  Text,
  Unspaced,
  YGroup,
  YStack
} from "tamagui";

import { buscarProductoPorCodigoDeBarras } from "../../controllers/apiController";

export default function App() {
  interface Product {
    Nombre: string;
    Precio: number;
    PrecioF: number;
    Oferta: number;
    Cantidad: number;
    Tipo_producto: string;
  }

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product>(null);
  const [shouldScan, setShouldScan] = useState(false);

  /*
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);
*/
  useFocusEffect(
    React.useCallback(() => {
      setShouldScan(false);
      console.log("useFocusEffect");
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      };
      getBarCodeScannerPermissions();
    }, [])
  );

  async function handleBarCodeScanned2({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
    data
  }: {
    type: string;
    data: string;
  }) {
    console.log("shouldScan " + shouldScan);
    if (shouldScan) {
      try {
        const productData = await buscarProductoPorCodigoDeBarras(data);

        if (productData) {
          setProducts(productData);
          console.log(productData);
          setOpen(true);
        } else {
          alert("Producto no encontrado");
        }
      } catch (error) {
        console.error(error);
        alert("Error al obtener el producto");
      }

      setShouldScan(false);
    }
  }

  const startScanning = () => {
    // Activa el escaneo
    setShouldScan(true);
  };

  if (hasPermission === null) {
    return <Text>Pidiendo permisos para usar la cámara...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No diste acceso</Text>;
  }

  return (
    <PortalProvider>
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Dialog
          modal
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setOpen(false);
            }
          }}
        >
          <Dialog.Trigger asChild>
            <BarCodeScanner
              onBarCodeScanned={
                startScanning ? handleBarCodeScanned2 : undefined
              }
              style={{ flex: 1, width: "100%" }}
            />
          </Dialog.Trigger>
          <Adapt
            when="sm"
            platform="touch"
          >
            <Sheet
              zIndex={200000}
              snapPointsMode="fit"
              modal
              dismissOnSnapToBottom
            >
              <Sheet.Frame
                padding="$4"
                gap="$4"
              >
                <Adapt.Contents />
              </Sheet.Frame>
              <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
            </Sheet>
          </Adapt>
          <Dialog.Portal>
            <Dialog.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              bordered
              elevate
              key="content"
              animateOnly={["transform", "opacity"]}
              animation={[
                "quick",
                {
                  from: { opacity: 0, transform: [{ translateY: 100 }] },
                  to: { opacity: 1, transform: [{ translateY: 0 }] }
                }
              ]}
              enterStyle={{ x: 0, y: 100, opacity: 0 }}
              exitStyle={{ x: 0, y: 100, opacity: 0 }}
              gap="$4"
            >
              <Dialog.Title>{products && products.Nombre}</Dialog.Title>
              <Dialog.Description>
                {products && (
                  <Text>Este Producto es: {products.Tipo_producto}</Text>
                )}
              </Dialog.Description>
              <YGroup>
                <YGroup.Item>
                  <Text style={styles.bold}>Precio</Text>
                  <Text style={styles.paragraph}>
                    ${products && products.Precio}
                  </Text>
                </YGroup.Item>
                <YGroup.Item>
                  <Text style={styles.bold}>Oferta</Text>
                  <Text style={styles.paragraph}>
                    {products && products.Oferta}%
                  </Text>
                </YGroup.Item>
                <YGroup.Item>
                  <Text style={styles.bold}>Precio Final</Text>
                  <Text style={styles.paragraph}>
                    ${products && products.PrecioF}
                  </Text>
                </YGroup.Item>
                <YGroup.Item>
                  <Text style={styles.bold}>Cantidad en Bodega</Text>
                  <Text style={styles.paragraph}>
                    {products && products.Cantidad}
                  </Text>
                </YGroup.Item>
              </YGroup>
              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$2"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>

          {shouldScan ? (
            <YStack
              alignSelf="center"
              margin="$4"
            >
              <Spinner size="large" />
              <Text>Escaneando...</Text>
            </YStack>
          ) : (
            <Button
              alignSelf="center"
              themeInverse
              onPress={startScanning}
              size="$6"
              margin="$4"
            >
              Escanear
            </Button>
          )}
        </Dialog>
      </YStack>
    </PortalProvider>
  );
}

const styles = {
  bold: {
    fontWeight: "bold",
    marginBottom: "5px"
  },
  paragraph: {
    marginBottom: "10px" // Espacio entre párrafos
  }
};
