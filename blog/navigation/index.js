// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de pantallas
import AuthScreen from '../screens/auth/authScreen';

// Importar Context de Usuario
const Stack = createStackNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthScreen"
      >
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{
            title: 'auth',
            headerLeft: null,
            headerRight: null,
            headerShown: false  // Esto quitará completamente el header

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;