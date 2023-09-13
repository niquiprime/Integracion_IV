import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo válido")
      .required("El correo es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  const handleSubmit = (values) => {
    // Aquí puedes manejar la lógica de inicio de sesión, por ejemplo, enviar los datos al servidor.
    console.log("Datos de inicio de sesión:", values);
  };

  return (
    <View>
      <Text>Login</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Correo electrónico"
            />
            <Text style={{ color: "red" }}>{errors.email}</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
              placeholder="Contraseña"
            />
            <Text style={{ color: "red" }}>{errors.password}</Text>
            <Button title="Iniciar Sesión" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
