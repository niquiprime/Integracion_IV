import { ArrowBigRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { Button, H1, YStack } from "tamagui";

import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return (
    <MyStack>
      <YStack
        space="$4"
        maxWidth={600}
      >
        <H1 textAlign="center">StockMovil.</H1>
      </YStack>
      <YStack space="$2.5">
        <Button
          iconAfter={ArrowBigRight}
          onPress={() => router.push("/login/login")}
        >
          Vamos!
        </Button>
        <Button onPress={() => router.push("/tabs")}>Go to tabs page</Button>
      </YStack>
    </MyStack>
  );
}
