const {
  EXPO_PUBLIC_REACT_APP_HOST,
  EXPO_PUBLIC_REACT_APP_LOGIN_ENDPOINT,
  EXPO_PUBLIC_REACT_APP_PRODUCTOS_ENDPOINT,
  EXPO_PUBLIC_REACT_APP_PRODUCTOS_BUSCAR_ENDPOINT,
  EXPO_PUBLIC_REACT_APP_USUARIO_ENDPOINT
} = process.env;

const controllers = {
  login: `${EXPO_PUBLIC_REACT_APP_HOST}${EXPO_PUBLIC_REACT_APP_LOGIN_ENDPOINT}`,
  obtenerTodosLosProductos: `${EXPO_PUBLIC_REACT_APP_HOST}${EXPO_PUBLIC_REACT_APP_PRODUCTOS_ENDPOINT}`,
  buscarProductoPorCodigoDeBarras: `${EXPO_PUBLIC_REACT_APP_HOST}${EXPO_PUBLIC_REACT_APP_PRODUCTOS_BUSCAR_ENDPOINT}`,
  usuario: `${EXPO_PUBLIC_REACT_APP_HOST}${EXPO_PUBLIC_REACT_APP_USUARIO_ENDPOINT}`
};

export default controllers;