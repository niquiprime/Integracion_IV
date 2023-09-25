import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";

const SearchProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([
    ["ID", "Producto", "Cantidad", "Precio", "Oferta", "Tipo"],
    ["1", "Cereal", "10", "$10.000", "No", "Tipo 1"],
    ["2", "Jabon", "5", "$15.000", "10", "Tipo 2"],
    ["3", "Arroz", "8", "$8.500", "No", "Tipo 1"],
    ["4", "Fideos", "12", "$12.990", "20", "Tipo 3"],
  ]);

  // Función para filtrar la tabla en función del texto de búsqueda
  const filterTable = () => {
    // Filtrar las filas de la tabla excluyendo la primera (encabezados)
    const filteredRows = tableData.filter(
      (row, index) =>
        index === 0 || row[1].toLowerCase().includes(searchText.toLowerCase())
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
