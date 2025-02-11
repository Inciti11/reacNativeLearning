//src/components/specific/auth/login/login.jsx
import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { styles } from './login.styles';
import { CustomButton, CustomInput } from '../../../common';
const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false); // Estado para controlar el envío

  const handleLogin = () => {
    setIsSubmitted(true); // Marcar que el formulario ha sido enviado

    // Validar campos antes de continuar
    if (!email || !password) {
      return; // Detener la ejecución si hay campos vacíos
    }

    // Aquí iría la lógica para iniciar sesión
    console.log('Iniciando sesión...');
  };

  return (
    <View style={styles.container}>
      {/* Input para el correo electrónico */}
      <CustomInput
        label="Correo electrónico" // Etiqueta opcional
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={setEmail}
        error={isSubmitted && !email ? 'Este campo es obligatorio' : ''}
      />

      {/* Input para la contraseña */}
      <CustomInput
        label="Contraseña" // Etiqueta opcional
        placeholder="Ingresa tu contraseña"
        secureTextEntry // Oculta el texto
        value={password}
        onChangeText={setPassword}
        error={isSubmitted && !password ? 'Este campo es obligatorio' : ''}
      />

      {/* Botón de inicio de sesión */}
      <CustomButton
        title="Iniciar sesión"
        colorBg="#5B4FE7" // Color personalizado (opcional)
        onPress={handleLogin}
      />
    </View>
  );
};

export default Login;