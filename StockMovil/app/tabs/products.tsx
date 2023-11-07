import React, { useEffect, useState } from "react";
import { ChevronDown } from "@tamagui/lucide-icons";
import {
  Accordion,
  Paragraph,
  Input,
  Square,
  Text,
  View,
  H3,
  YStack
} from "tamagui";

interface Product {
  Nombre: string;
  Precio: number;
  PrecioF: number;
  Oferta: number;
  Cantidad: number;
  Tipo_producto: string;
}

const SearchProduct: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "https://stockmovil-back.onrender.com/api/productos/todos"
      );
      const data: Product[] = await response.json();

      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.Nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <YStack
      flex={1}
      padding="$4"
      paddingTop="$6"
    >
      <Input
        placeholder="Buscar producto"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        marginBottom="$4"
        padding="$2"
      />
      {loading ? (
        <Text>Cargando datos...</Text>
      ) : (
        <View>
          {filteredProducts.map((product, index) => (
            <Accordion
              overflow="hidden"
              width="100%"
              type="multiple"
              key={index}
            >
              <Accordion.Item value="a1">
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  {({ open }) => (
                    <>
                      <Paragraph>
                        {" "}
                        <H3>{product.Nombre}</H3>{" "}
                      </Paragraph>
                      <Square
                        animation="quick"
                        rotate={open ? "180deg" : "0deg"}
                      >
                        <ChevronDown size="$1" />
                      </Square>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.Content
                  padding="$3"
                  borderRadius="$3"
                  style={{
                    border: "1px solid #ccc", // Agrega un borde
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Agrega una sombra
                    margin: "10px 0", // Espaciado entre elementos
                    padding: "10px" // Espaciado interno
                  }}
                >
                  <Paragraph
                    style={{ fontWeight: "bold", marginBottom: "5px" }}
                  >
                    Cantidad: {product.Cantidad}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: "5px" }}>
                    Oferta: {product.Oferta}%
                  </Paragraph>
                  <Paragraph style={{ marginBottom: "5px" }}>
                    Precio: ${product.Precio}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: "5px" }}>
                    Precio Final: ${product.PrecioF}
                  </Paragraph>
                  <Paragraph style={{ marginBottom: "5px" }}>
                    Tipo de Producto: {product.Tipo_producto}
                  </Paragraph>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          ))}
        </View>
      )}
    </YStack>
  );
};

export default SearchProduct;
