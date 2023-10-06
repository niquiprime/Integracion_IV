import React from "react";
import { Button, Dialog, Text, YStack } from "tamagui";

interface ModalScannDataProps {
  data: {
    Nombre: string;
    Precio: number;
  };
  open: boolean;
  setO;
}

const ModalScannData: React.FC<ModalScannDataProps> = ({
  data,
  visible,
  onClose
}) => {
  return (
    <Dialog
      modal
      onOpenChange={onClose}
      onClose={onClose}
      size="lg" // Puedes ajustar el tamaño como desees
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      containerStyle={{ height: "100vh", width: "100vw" }} // Ocupa toda la pantalla
    >
      <YStack
        backgroundColor="white"
        padding="$4"
        borderRadius="$4"
        alignItems="center"
      >
        <Text
          fontSize="$4"
          fontWeight="bold"
          marginBottom="$2"
        >
          {data.Nombre}
        </Text>
        <Text
          fontSize="$3"
          marginBottom="$3"
        >
          Precio: ${data.Precio}
        </Text>
        <Button onPress={onClose}>Cerrar</Button>
      </YStack>
    </Dialog>
  );
};

export default ModalScannData;
