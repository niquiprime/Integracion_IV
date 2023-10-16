import React, { useEffect, useState } from "react";
import { X } from "@tamagui/lucide-icons";
import { BarCodeScanner } from "expo-barcode-scanner";
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
  const [scanned, setScanned] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);

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
    // con fetch obtener el producto enviando el data endpoint => https://stockmovil-back.onrender.com/api/productos/:id GET
    // si el producto existe, abrir el modal con los datos del producto
    setScanned(true);
    setType(type);
    setData(data);
    setOpen(true);
  };

  if (hasPermission === null) {
    return <Text>Pidiendo permisos para usar la camara...</Text>;
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
              setScanned(false);
              setOpen(false);
            }
          }}
        >
          <Dialog.Trigger asChild></Dialog.Trigger>
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
              <Dialog.Title>Modal Test</Dialog.Title>
              <Dialog.Description>
                Data = {data} y Tipo = {type}
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
        </Dialog>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ flex: 1, width: "100%" }}
        />
      </YStack>
    </PortalProvider>
  );
}
