import { YStack, H1, Spacer } from "tamagui";

import ButtonWelcome from "./ButtonWelcome";

export default function Welcome() {
  return (
    <YStack
      flex={1}
      alignItems="center"
      px="$4"
      pt="auto" 
    >
      <Spacer flex={1} />
      <H1>Stock Movil</H1>
      <Spacer flex={3} /> 
        <ButtonWelcome/>
      <Spacer flex={1} />
    </YStack>
  );
}
