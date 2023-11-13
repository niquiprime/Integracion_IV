import { ArrowBigRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button, H1, Image, SizableText, YStack } from "tamagui";

import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return (
    <MyStack>
      <YStack
        space="$4"
        maxWidth={600}
        alignSelf="center"
      >
        <H1
          textAlign="center"
          marginTop={100}
        >
          Bienvenido a StockMovil
        </H1>
        <SizableText
          theme="alt2"
          size="$4"
        >
          Administre su inventario de manera fácil y rápida
        </SizableText>
      </YStack>
      <YStack
        space="$2.5"
        alignItems="center"
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2897/2897818.png",
            width: 175,
            height: 175
          }}
        />
      </YStack>
      <YStack
        space="$2.5"
        alignItems="center"
      >
        <Button
          theme="active"
          iconAfter={ArrowBigRight}
          marginBottom={100}
          //responsive
          width={200}
          height={50}
          //funcion alternaria, si en el securestore hay un token, va a la pagina de tabs, sino a la de login
          onPress={async () => {
            const token = await SecureStore.getItemAsync("token");
            console.log(token);
            if (token) {
              router.push("/tabs");
            } else {
              router.push("/login/login");
            }
          }}
        >
          Vamos!
        </Button>
        {/*<Button onPress={() => router.push("/tabs")}>Go to tabs page</Button>*/}
      </YStack>
    </MyStack>
  );
}
