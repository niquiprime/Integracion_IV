// apiController.tsx
import Axios from "axios";
import * as SecureStore from "expo-secure-store";

import controllers from "./controllers";

const obtenerTodosLosProductosUrl = controllers.obtenerTodosLosProductos;
const buscarProductoPorCodigoDeBarrasUrl =
  controllers.buscarProductoPorCodigoDeBarras;
const loginUrl = controllers.login;
const usuario = controllers.usuario;

async function getToken() {
  const token = await SecureStore.getItemAsync("token");
  return token;
}
export const obtenerTodosLosProductos = async () => {
  console.log(obtenerTodosLosProductosUrl);
  try {
    const response = await Axios.get(obtenerTodosLosProductosUrl, {
      headers: { "auth-token": await getToken() }
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener todos los productos");
  }
};

export const buscarProductoPorCodigoDeBarras = async (codigo: string) => {
  try {
    const response = await Axios.get(
      `${buscarProductoPorCodigoDeBarrasUrl}/${codigo}`,
      {
        headers: { "auth-token": await getToken() }
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al buscar el producto por código de barras");
  }
};

async function save(token: string) {
  await SecureStore.setItemAsync("token", token);
  const options = {
    method: "GET",
    headers: { "auth-token": token },
    url: usuario
  };
  try {
    const response = await Axios(options);
    const data = response.data;
    await SecureStore.setItemAsync("usuario", JSON.stringify(data));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export const login = async (email: string, password: string) => {
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data: { email, password },
    url: loginUrl
  };
  try {
    const response = await Axios(options);
    const token = response.data.data.token;
    await save(token);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
