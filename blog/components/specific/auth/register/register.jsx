import React, { useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet, Text } from 'react-native'; // Añadido Text y StyleSheet
import { useNavigation } from '@react-navigation/native';
import { styles as customStyles } from './register.styles';
import { CustomButton, CustomInput } from '../../../common';
// Opcional: Para feedback no bloqueante (requiere instalación y configuración)
// import Toast from 'react-native-toast-message';

// --- Funciones de Validación ---
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// --- Componente Register ---
const Register = () => {
  const navigation = useNavigation();

  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de UI y errores
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Limpia errores al escribir
  const handleInputChange = (setter, fieldName) => (text) => {
    setter(text);
    if (isSubmitted) {
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: undefined }));
    }
  };

  // --- Lógica de Registro ---
  const handleRegister = async () => {
    setIsSubmitted(true);
    setErrors({});
    let validationErrors = {};

    // 1. Validaciones Locales (igual que antes)
    if (!email) validationErrors.email = 'El correo electrónico es obligatorio.';
    else if (!validateEmail(email)) validationErrors.email = 'El formato del correo no es válido.';
    if (!password) validationErrors.password = 'La contraseña es obligatoria.';
    if (!confirmPassword) validationErrors.confirmPassword = 'Debes confirmar la contraseña.';
    else if (password && confirmPassword && password !== confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 2. Iniciar proceso de registro (API Call)
    setLoading(true);
    try {
      // --- Simulación/Llamada a API (igual que antes) ---
      // ¡¡¡ REEMPLAZA CON TU LLAMADA REAL !!!
      console.log('Enviando datos de registro:', { email, password });
      await new Promise(resolve => setTimeout(resolve, 1500));
      const simulatedApiSuccess = Math.random() > 0.2;
      if (!simulatedApiSuccess) {
        throw new Error("Este correo electrónico ya está registrado.");
      }
      // --- Fin Simulación ---

      // 3. Manejo de Éxito - ¡MODIFICADO PARA REDIRECCIÓN INMEDIATA!
      setLoading(false); // Detiene el indicador de carga PRIMERO
      console.log('Registro completado exitosamente. Redirigiendo...');

      // --- NAVEGACIÓN INMEDIATA ---
      // Ejecuta la navegación ANTES de cualquier alerta o limpieza final
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }], // Verifica el nombre 'Inicio'
      });
      // --------------------------

      // Limpiar el formulario (opcional pero recomendado, se hará mientras navega)
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsSubmitted(false);
      setErrors({});

      // -- Se eliminó el Alert.alert bloqueante --
      // Opcional: Mostrar un mensaje corto NO bloqueante (ej: Toast) si lo deseas
      // Toast.show({ type: 'success', text1: 'Registro Exitoso', text2: '¡Bienvenido!' });


    } catch (error) {
      // 4. Manejo de Errores (igual que antes)
      setLoading(false);
      console.error('Error en el registro:', error);
      // Mantenemos la alerta para errores, ya que sí requieren atención del usuario
      Alert.alert(
        'Error de Registro',
        error.message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
      );
      // setErrors({ general: error.message || 'Error inesperado' });
    }
  };

  const styles = customStyles || defaultStyles;

  return (
    <View style={styles.container}>
      {/* Inputs (igual que antes) */}
      <CustomInput
        label="Correo electrónico"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={handleInputChange(setEmail, 'email')}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        secureTextEntry
        value={password}
        onChangeText={handleInputChange(setPassword, 'password')}
        error={errors.password}
      />
      <CustomInput
        label="Confirmar contraseña"
        placeholder="Confirma tu contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={handleInputChange(setConfirmPassword, 'confirmPassword')}
        error={errors.confirmPassword}
      />

      {/* Indicador de carga o Botón (igual que antes) */}
      {loading ? (
        <ActivityIndicator size="large" color="#5B4FE7" style={styles.activityIndicator} />
      ) : (
        <CustomButton
          title="Registrarse"
          colorBg="#5B4FE7"
          onPress={handleRegister}
          disabled={loading}
        />
      )}
       {/* {errors.general && <Text style={styles.errorTextGeneral}>{errors.general}</Text>} */}
    </View>
  );
};

// Estilos por defecto (igual que antes)
const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    marginTop: 20,
    paddingVertical: 12,
  },
  // errorTextGeneral: { ... }
});

export default Register;