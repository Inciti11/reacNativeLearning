// src/screens/HomeScreen/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa si necesitas navegación desde aquí (ej. logout)

const HomeScreen = () => {
  const navigation = useNavigation(); // Opcional, para botones como "Cerrar Sesión"

  // Función de ejemplo para cerrar sesión
  const handleLogout = () => {
    // Aquí normalmente limpiarías el estado de autenticación (tokens, etc.)
    console.log('Cerrando sesión...');
    // Y luego reiniciarías la navegación hacia la pantalla de Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Asegúrate que 'Login' es el nombre de tu pantalla de login
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
      {/* Puedes añadir cualquier contenido que necesites para tu pantalla de inicio */}

      {/* Botón de ejemplo para cerrar sesión */}
      <View style={styles.buttonContainer}>
        <Button title="Cerrar Sesión" onPress={handleLogout} color="#FF6347" />
      </View>
    </View>
  );
};

// Estilos básicos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center',     // Centra horizontalmente
    padding: 20,
    backgroundColor: '#f5f5f5', // Un color de fondo suave
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20, // Espacio arriba del botón
    width: '80%', // Ancho del contenedor del botón
  }
});

export default HomeScreen;