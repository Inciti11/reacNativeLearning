import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { styles } from './register.styles';
import { CustomButton, CustomInput } from '../../../common';


const Register = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false); // Estado para controlar el envío

  const handleRegister = () => {
    setIsSubmitted(true); // Marcar que el formulario ha sido enviado

    // Validar campos antes de continuar
    if (!email || !password) {
      return; // Detener la ejecución si hay campos vacíos
    }

    // Aquí iría la lógica para iniciar registro
    console.log('Iniciando Registro...');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label="Correo electrónico" // Etiqueta opcional
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChangeText={setEmail}
        error={isSubmitted && !email ? 'Este campo es obligatorio' : ''} // Mensaje de error opcional
      />

      <CustomInput
        label="Contraseña" // Etiqueta opcional
        placeholder="Ingresa tu contraseña"
        secureTextEntry // Oculta el texto
        value={password}
        onChangeText={setPassword}
        error={isSubmitted && !password ? 'Este campo es obligatorio' : ''} // Mensaje de error opcional
      />

      <CustomInput
        label="Confirmar contraseña" // Etiqueta opcional
        placeholder="Confirma tu contraseña"
        secureTextEntry // Oculta el texto
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        error={isSubmitted && !confirmPassword ? 'Este campo es obligatorio' : ''} // Mensaje de error opcional
      />

      <CustomButton
        title="Registrarse"
        colorBg="#5B4FE7" // Color personalizado (opcional)
        onPress={handleRegister}

      />
    </View>
  );
};

export default Register;