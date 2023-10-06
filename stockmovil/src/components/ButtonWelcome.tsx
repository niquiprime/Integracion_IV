import React from "react";
import { Button} from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Link } from 'expo-router';

export default function ButtonWelcome() {
  return (
    <Link href="/(login)/login" asChild>
      <Button 
      icon={ChevronRight} 
      size="$6"
      variant="outlined"
      >
      </Button>
    </Link>
  );
}
