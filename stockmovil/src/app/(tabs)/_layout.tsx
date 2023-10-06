import { Tabs } from "expo-router";


export default function TabRoutesLayout() {

    return(
                
        <Tabs>
        <Tabs.Screen
            name="profile"
            options={{
                headerShown: false,
            }}
        />
        <Tabs.Screen
            name="cameraScreen"
            options={{
                headerShown: false,
            }}
        />
        <Tabs.Screen
            name="products"
            options={{
                headerShown: false,
            }}
        />
        </Tabs>

    )

}