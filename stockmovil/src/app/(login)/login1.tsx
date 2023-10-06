import React from "react";
import { Button, Label, H2, Input, Form, Text, YStack, XStack } from "tamagui";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo válido")
      .required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });


  const router = useRouter();
  const handleSubmit = (values) => {
    console.log("Datos de inicio de sesión:" + values.email + " " + values.password);
    router.push("/(tabs)/profile");
  };

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center" // Centra verticalmente en la pantalla
    >
      <H2>Login</H2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <YStack
            padding="$3"
            minWidth={300}
            space="$4"
            width="100%" // Ocupa todo el ancho disponible
            maxWidth={400} // Establece un ancho máximo
          >
            <Form onSubmit={handleSubmit}>
              <XStack alignItems="center" space="$4">
                <Label width={90} htmlFor="email">
                  Email
                </Label>
                <Input
                  flex={1}
                  id="email"
                  value={values.email}
                  defaultValue={initialValues.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
              </XStack>
              <Text color="$red">{errors.email}</Text>

              <XStack alignItems="center" space="$4">
                <Label width={90} htmlFor="pass">
                  Contraseña
                </Label>
                <Input
                  flex={1}
                  id="pass"
                  value={values.password}
                  defaultValue={initialValues.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
              </XStack>
              <Text color="$error">{errors.password}</Text>

              <Form.Trigger asChild>
                <Button>Iniciar sesión</Button>
              </Form.Trigger>
            </Form>
          </YStack>
        )}
      </Formik>
    </YStack>
  );
};

export default Login;
