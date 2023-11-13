import React, { useState } from "react";
import { useRouter } from "expo-router";
import { Button, Form, H2, Input, Label, Text, XStack, YStack } from "tamagui";
import * as Yup from "yup";

import { login } from "../../controllers/apiController";

const logintest = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo válido")
      .required("El correo es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria")
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const { email, password } = formData;
      await login(email, password);
      router.push("/tabs");
    } catch (err) {
      console.log(err);
      const newErrors = {
        email: "",
        password: ""
      };
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <YStack
      flex={1}
      justifyContent="center" // Centra verticalmente
      alignItems="center" // Centra horizontalmente
    >
      <Form
        onSubmit={handleSubmit}
        minWidth={300}
        gap="$2"
        borderWidth={1}
        borderRadius="$4"
        backgroundColor="$background"
        borderColor="$borderColor"
        padding="$8"
      >
        <H2>Ingresa</H2>
        <YStack
          padding="$3"
          minWidth={300}
          space="$4"
        >
          <XStack
            alignItems="center"
            space="$4"
          >
            <Label
              width={90}
              htmlFor="email"
            >
              Correo
            </Label>
            <Input
              flex={1}
              id="email"
              onChangeText={(text) => handleChange("email", text)}
              value={formData.email}
            />
          </XStack>
          <Text color="red">{errors.email}</Text>
          <XStack
            alignItems="center"
            space="$4"
          >
            <Label
              width={90}
              htmlFor="password"
            >
              Contraseña
            </Label>
            <Input
              flex={1}
              id="password"
              onChangeText={(text) => handleChange("password", text)}
              value={formData.password}
              secureTextEntry
            />
          </XStack>
          <Text color="red">{errors.password}</Text>
        </YStack>
        <Form.Trigger asChild>
          <Button theme="active">Iniciar sesión</Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};

export default logintest;
