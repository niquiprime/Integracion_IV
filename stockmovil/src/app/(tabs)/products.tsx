import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const SearchProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para controlar la carga de datos

  // Función para obtener los datos de la API
  const fetchProductData = async () => {
    try {
      const response = await fetch(
        "https://stockmovil-back.onrender.com/api/productos/todos"
      );
      const data = await response.json();
      // Actualizar el estado de tableData con los datos de la API
      setTableData([
        ["Nombre", "Precio"], // Encabezados de la tabla
        ...data.map((product) => [product.Nombre, `$${product.Precio}`]), // Datos de los productos
      ]);
      setLoading(false); // Indicar que los datos se han cargado
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []); // Realizar la solicitud una vez al cargar el componente

  // Función para filtrar la tabla en función del texto de búsqueda
  const filterTable = () => {
    // Filtrar las filas de la tabla excluyendo la primera (encabezados)
    const filteredRows = tableData.filter(
      (row, index) =>
        index === 0 || row[0].toLowerCase().includes(searchText.toLowerCase())
    );
    return filteredRows;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      {loading ? (
        <Text>Cargando datos...</Text>
      ) : (
        <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
          <Row
            data={tableData[0]}
            style={styles.head}
            textStyle={{ ...styles.text, fontWeight: "bold" }}
          />
          <Rows
            data={filterTable().slice(1)} // Excluir la fila de encabezados
            textStyle={styles.text}
          />
        </Table>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default SearchProduct;
