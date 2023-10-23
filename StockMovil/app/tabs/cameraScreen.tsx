import React, { useEffect, useState } from "react";
import { X } from "@tamagui/lucide-icons";
import Axios from "axios";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useFocusEffect } from "expo-router";
import {
  Adapt,
  Button,
  Dialog,
  PortalProvider,
  Sheet,
  Text,
  Unspaced,
  YStack
} from "tamagui";

export default function App() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState<string | null>(null);
  const [shouldScan, setShouldScan] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    setShouldScan(false);
    console.log("useEffect scan : " + shouldScan);
    getBarCodeScannerPermissions();
  }, []);

  useFocusEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    console.log("useFocusEffect scan : " + shouldScan);
    getBarCodeScannerPermissions();

    return () => {
      console.log("useFocusEffect return");
    };
  });

  const handleBarCodeScanned = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
    data
  }: {
    type: string;
    data: string;
  }) => {
    console.log("shouldScan: ", shouldScan);
    if (shouldScan) {
      try {
        const response = await Axios.get(
          `https://stockmovil-back.onrender.com/api/productos/codigo/${data}`
        );
        const product = response.data;
        console.log(product);

        if (product) {
          setNombre(product.Nombre);
          setOpen(true);
        } else {
          alert("Producto no encontrado");
        }
      } catch (error) {
        console.error(error);
        alert("Error al obtener el producto");
      }

      // Desactiva el escaneo para evitar escaneos múltiples
      setShouldScan(false);
    }
  };

  const startScanning = () => {
    console.log("1: " + shouldScan);
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
              onBarCodeScanned={handleBarCodeScanned}
              style={{ flex: 1, width: "100%" }}
            />
          </Dialog.Trigger>
          <Adapt
            when="sm"
            platform="touch"
          >
            <Sheet
              zIndex={200000}
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
              <Dialog.Title>{nombre}</Dialog.Title>
              <Dialog.Description>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
                facilis consequatur aliquid, ex earum consectetur necessitatibus
                eaque enim laboriosam esse nobis amet maxime voluptates.
                Debitis, molestias? Consectetur cupiditate enim earum.
              </Dialog.Description>
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
          <Button
            alignSelf="center"
            themeInverse
            onPress={startScanning}
            size="$6"
            margin="$4"
          >
            Escanear
          </Button>
        </Dialog>
      </YStack>
    </PortalProvider>
  );
}
