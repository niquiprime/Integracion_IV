import { ListItem, Separator, Switch, XGroup, YGroup, YStack } from "tamagui";

import LogOut from "./LogOut";
export function StackConfigButton() {
  return (
    <YStack
      space="$2"
      padding="$4"
      alignItems="center"
    >
      {/* Separator */}

      <YGroup separator={<Separator />}>
        <YGroup.Item>
          <XGroup alignContent="space-between">
            <XGroup.Item>
              <ListItem
                title="Modo Oscuro"
                subTitle="Activa o desactiva el modo oscuro"
              />
              <Switch
                size={"small"}
                marginTop="$4"
                defaultChecked={false}
              >
                <Switch.Thumb animation="quick" />
              </Switch>
            </XGroup.Item>
          </XGroup>
        </YGroup.Item>
      </YGroup>
      <LogOut />
    </YStack>
  );
}
