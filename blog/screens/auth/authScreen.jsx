// AuthScreen.jsx - AJUSTADO según tu solicitud

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  // ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Login from '../../components/specific/auth/login/login'; // Ajusta ruta si es necesario
import Register from '../../components/specific/auth/register/register'; // Ajusta ruta si es necesario
import SlidePanel from '../../components/common/slidePanel/SlidePanel'; // Ajusta ruta si es necesario

const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(true);
  const slidePanelRef = useRef(null);

  const toggleAuthMode = () => {
    // Cambia entre mostrar Login y Registro
    setShowLogin(prevShowLogin => !prevShowLogin);
    // No necesitamos abrir/cerrar el panel aquí, solo cambiar el contenido
  };

  const handleTogglePanel = () => {
    // El botón '<' todavía puede abrir/cerrar el panel manualmente
    slidePanelRef.current?.toggle();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5B4FE7', '#4F46E5']}
        style={styles.gradientBackground}
      />

      <View style={styles.contentContainer}>
        {/* Sección Superior: Header (simplificado) y Logo */}
        <View style={styles.topSection}>
          {/* ---- HEADER MODIFICADO ---- */}
          <View style={styles.header}>
            {/* Mantenemos el botón de toggle del panel */}
            <TouchableOpacity style={styles.backButton} onPress={handleTogglePanel}>
              <Text style={styles.backText}>{'<'}</Text>
            </TouchableOpacity>
            {/* Eliminamos la parte derecha del header (headerRight) */}
          </View>
          {/* ---- FIN HEADER MODIFICADO ---- */}

          <View style={styles.logoContainer}>
            <Text style={styles.logo}>CONOCE NUESTROS PROYECTOS</Text>
          </View>
        </View>

        {/* Sección Inferior: SlidePanel */}
        <View style={styles.bottomSection}>
          <SlidePanel
            ref={slidePanelRef}
            mode="drawer"
            initiallyOpen={true}
            style={styles.slidePanelStyle}
            contentContainerStyle={styles.slidePanelContent}
            // handleHeight={50} // Comentado, ajustar si es necesario
          >
            {/* Contenido interno del panel */}
            <View style={styles.panelInnerContent}>
              <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>
                  {showLogin ? 'BIENVENIDO' : 'CREAR CUENTA'}
                </Text>
              </View>

              {/* ---- CONTENIDO CONDICIONAL MODIFICADO ---- */}
              {showLogin ? (
                <>
                  <Login />
                  {/* Texto "¿Olvidaste tu contraseña?" solo en Login */}
                  <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>
                  {/* Botón para ir a Registro */}
                  <TouchableOpacity
                    style={styles.toggleAuthContainer} // Usamos un estilo similar o nuevo
                    onPress={toggleAuthMode} // Llama a la función para cambiar
                  >
                    <Text style={styles.toggleAuthText}>
                      ¿No tienes una cuenta? Regístrate
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Register />
                  {/* Botón para ir a Inicio de Sesión */}
                  <TouchableOpacity
                    style={styles.toggleAuthContainer} // Usamos un estilo similar o nuevo
                    onPress={toggleAuthMode} // Llama a la función para cambiar
                  >
                    <Text style={styles.toggleAuthText}>
                      ¿Ya tienes una cuenta? Iniciar Sesión
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              {/* ---- FIN CONTENIDO CONDICIONAL MODIFICADO ---- */}
            </View>
          </SlidePanel>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Estilos para AuthScreen (Añadimos estilos para los nuevos botones)
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    gradientBackground: {
      position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    },
    contentContainer: {
      flex: 1,
    },
    topSection: {
      height: '30%', // Ajusta según necesites si el contenido cambia mucho
      paddingHorizontal: 20,
      paddingTop: 20, // Asegúrate que no choque con la barra de estado
      zIndex: 1,
    },
    header: {
      flexDirection: 'row',
      // Solo necesitamos el botón de atrás, así que no hace falta space-between
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    backButton: {
      padding: 10,
    },
    backText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
    // headerRight y sus hijos (headerText, getStartedText) ya no son necesarios
    // headerRight: { ... },
    // headerText: { ... },
    // getStartedText: { ... },
    logoContainer: {
      position: 'absolute',
      top: 0, // Ajusta si el header cambia de tamaño
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      // Asegúrate de que el logo no se superponga con el botón '<' si es necesario
      paddingLeft: 60, // Ejemplo: Añadir padding si el botón interfiere
      paddingRight: 20, // Ejemplo: Añadir padding por si acaso
    },
    logo: {
      color: 'white',
      fontSize: 32, // Podrías necesitar ajustar el tamaño si el espacio cambia
      fontWeight: 'bold',
      textAlign: 'center', // Asegura que el texto se centre si hay saltos de línea
    },
    bottomSection: {
      flex: 1,
      // Si usas flex: 1, SlidePanel debe manejar su propio posicionamiento/altura.
    },
    slidePanelStyle: {
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      // La altura se determinará por el contenido o puedes fijarla
      // minHeight: '70%', // Ejemplo, si quieres que ocupe al menos X altura
    },
    slidePanelContent: {
      // Estilos para el View interno de SlidePanel (si es necesario)
    },
    panelInnerContent: {
      paddingHorizontal: 25,
      paddingTop: 30,
      paddingBottom: 30, // Espacio en la parte inferior
    },
    welcomeContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    // Estilo para "¿Olvidaste tu contraseña?" (se mantiene igual)
    forgotPasswordContainer: {
      alignItems: 'center',
      marginTop: 15,
    },
    forgotPasswordText: {
      color: '#5B4FE7', // Mantenemos el color original
      fontSize: 14,
      fontWeight: 'bold', // Mantenemos el bold original
    },
    // Nuevo estilo (o reutilizado) para los botones de cambio de modo (Login/Register)
    toggleAuthContainer: {
        alignItems: 'center',
        marginTop: 20, // Un poco más de espacio que el forgot password
    },
    toggleAuthText: {
        color: '#5B4FE7', // Mismo color que forgot password
        fontSize: 14,
        fontWeight: 'bold', // Mismo bold que forgot password
        textDecorationLine: 'underline', // Subrayado para indicar acción
    },
});

export default AuthScreen;