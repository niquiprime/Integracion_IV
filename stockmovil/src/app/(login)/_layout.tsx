import { Stack } from "expo-router";


export default function TabRoutesLayout() {

    return(
            <Stack screenOptions={{ 
                headerShown : false,
                
                }}>
                <Stack.Screen 
                name="login"
                options={{
                    headerShown: false,
                }}
                />
            </Stack>

    )

}