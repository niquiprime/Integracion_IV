import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Button, Text, YStack } from "tamagui";

const ProductDetails = () => {
  const { nombre, codigo } = useGlobalSearchParams();

  console.log(nombre + " " + codigo);

  if (!nombre || !codigo) {
    // Maneja el caso en el que no haya datos de producto
    return (
      <YStack
        justifyContent="center"
        alignItems="center"
        flex={1}
      >
        <Text>No se encontraron datos del producto.</Text>
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      padding="$4"
    >
      <Text
        fontSize="$5"
        fontWeight="bold"
        marginBottom="$3"
      >
        Detalles del Producto WIP
      </Text>
      <Text
        fontSize="$4"
        marginBottom="$2"
      >
        Nombre: {nombre}
      </Text>
      <Text
        fontSize="$4"
        marginBottom="$2"
      >
        Código de Barras: {codigo}
      </Text>
      <Text
        fontSize="$4"
        marginBottom="$2"
      >
        Precio: $
      </Text>
      {/* Puedes mostrar más detalles del producto aquí */}
      <Link
        href="/tabs/cameraScreen"
        asChild
      >
        <Button>Volver a escanear!</Button>
      </Link>
    </YStack>
  );
};

export default ProductDetails;
