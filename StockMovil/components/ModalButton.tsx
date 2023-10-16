import { useState } from "react";
import { Button, Dialog } from "tamagui";

export default function ModalButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      modal
      onOpenChange={(open) => setOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>
    </Dialog>
  );
}
