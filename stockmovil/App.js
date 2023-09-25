import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/components/Welcome';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Dashboard from './screens/Dashboard';
import CameraScreen from './screens/CameraScreen';
import SearchProduct from './screens/Products';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name="Home" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SearchProduct" component={SearchProduct} />

      </Stack.Navigator>


    </NavigationContainer>
  );
}

export default App;
