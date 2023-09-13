import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/components/Welcome';
import Login from './screens/Login';
import Camera from './screens/Camera';
import Dashboard from './screens/Dashboard';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Dashboard" component={Dashboard} />

      </Stack.Navigator>


    </NavigationContainer>
  );
}

export default App;
