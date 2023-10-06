import { XStack, Switch, SwitchProps } from "tamagui";
import { Sun, Moon } from '@tamagui/lucide-icons'
export function ChangeTheme({...rest}: SwitchProps){
    return (
        <XStack>
            <Sun size="$2" />
            <Switch size= "$2" bg="$gray6" {...rest}>
                <Switch.Thumb animation="bouncy"/>
            </Switch>
            <Moon size="$2" />
        </XStack>
    )
}