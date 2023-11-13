import { useState } from "react";
import { Settings } from "@tamagui/lucide-icons";
import { Adapt, Button, Dialog, Sheet, XStack } from "tamagui";

import { StackConfigButton } from "./StackConfigButton";
export function LogOutBtn() {
  return <DialogInstance />;
}

//TODO: Que el modal baje al cerrar sesion
function DialogInstance() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog
      modal
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          icon={Settings}
          scaleIcon={2}
          circular
          size={"$5"}
        ></Button>
      </Dialog.Trigger>
      <Adapt
        when="sm"
        platform="touch"
      >
        <Sheet
          animation="quick"
          zIndex={200000}
          modal
          snapPointsMode="fit"
          dismissOnSnapToBottom
        >
          <Sheet.Frame
            padding="$4"
            gap="$4"
          >
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true
              }
            }
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>Configuración</Dialog.Title>

          <Dialog.Description>Preferencias de la aplicación</Dialog.Description>

          <StackConfigButton />

          <XStack
            alignSelf="flex-end"
            gap="$4"
          >
            <Dialog.Close
              displayWhenAdapted
              asChild
            ></Dialog.Close>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
