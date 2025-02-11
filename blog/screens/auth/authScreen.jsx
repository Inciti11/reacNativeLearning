import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Login from '../../components/specific/auth/login/login';
import Register from '../../components/specific/auth/register/register';
import SlidePanel from '../../components/common/slidePanel/SlidePanel';

const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthMode = () => {
    setShowLogin(!showLogin);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#5B4FE7', '#4F46E5']}
        style={styles.gradientBackground}
      />
      <View style={styles.contentContainer}>
        <View style={styles.topSection}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backText}>{'<'}</Text>
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>
                {showLogin ? '¿No tienes una cuenta?' : 'Ya tengo una cuenta'}
              </Text>
              <TouchableOpacity onPress={toggleAuthMode}>
                <Text style={styles.getStartedText}>
                  {showLogin ? 'Registrarse' : 'Iniciar Sesión'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>BLOG</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <SlidePanel
            mode="drawer"
            initiallyOpen={true}
            style={styles.slidePanelStyle}
            contentContainerStyle={styles.slidePanelContent}
          >
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                {showLogin ? 'BIENVENIDO' : 'CREAR CUENTA'}
              </Text>
            </View>
            {showLogin ? (
              <>
                <Login />
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>
                    ¿Olvidaste tu contraseña?
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Register />
            )}
          </SlidePanel>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    height: '30%',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: 'white',
    fontSize: 24,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    marginRight: 5,
  },
  getStartedText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  slidePanelStyle: {
    padding: 20,
  },
  slidePanelContent: {
  },
});

export default AuthScreen;