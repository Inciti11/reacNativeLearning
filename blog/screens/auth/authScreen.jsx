import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Login from '../../components/specific/auth/login/login';
import Register from '../../components/specific/auth/register/register';

const AuthScreen = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [panelHeight, setPanelHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const handleHeight = 40;
  const timeoutRef = useRef(null);

  const toggleAuthMode = () => {
    setShowLogin(!showLogin);
    setPanelHeight(0);
  };
  
  const togglePanel = () => {
    if (panelHeight === 0) return;
    const toValue = isPanelOpen ? panelHeight - handleHeight : 0;
    Animated.timing(translateY, {
      toValue,
      duration: 600,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
    setIsPanelOpen(!isPanelOpen);
  };

  const updatePanelHeight = (height) => {
    setPanelHeight(height);
    if (!isPanelOpen) {
      translateY.setValue(height - handleHeight);
    } else {
      translateY.setValue(0);
    }
  };

  const onPanelLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updatePanelHeight(height);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          <Animated.View
            style={[styles.whiteContainer, { transform: [{ translateY }] }]}
            onLayout={onPanelLayout}
          >
            <TouchableOpacity style={styles.drawerHandle} onPress={togglePanel}>
              <View style={styles.handleBar} />
            </TouchableOpacity>
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
          </Animated.View>
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
  whiteContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerHandle: {
    alignSelf: 'center',
    marginBottom: 15,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  handleBar: {
    width: 100,
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 50,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 10,
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
});

export default AuthScreen;