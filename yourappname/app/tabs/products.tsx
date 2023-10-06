import React, { useEffect, useState } from "react";
import { Card, H3, Input, Separator, Text, View, YStack } from "tamagui";

interface Product {
  Nombre: string;
  Precio: number;
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
            <Card
              key={index}
              backgroundColor="$background"
              marginBottom="$4"
            >
              <H3>{product.Nombre}</H3>
              <Separator />
              <Text>Precio: ${product.Precio}</Text>
            </Card>
          ))}
        </View>
      )}
    </YStack>
  );
};

export default SearchProduct;
