// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Reemplaza la línea 5 con esto:
import HomeScreen from '../screens/auth/Homescreen';
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
               <Stack.Screen
          name="Inicio" // <-- ESTE NOMBRE debe coincidir EXACTAMENTE con el usado en navigation.reset
          component={HomeScreen}
          options={{
            title: 'Inicio', // Título que aparecerá en la cabecera
            headerBackVisible: false, // Oculta el botón de retroceso para no volver a Login/Register
            // gestureEnabled: false, // Deshabilita el gesto de deslizar para atrás (opcional)
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;