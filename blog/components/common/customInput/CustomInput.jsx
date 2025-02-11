// components/common/CustomInput/CustomInput.jsx
import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { styles } from './CustomInput.styles';

export const CustomInput = ({
  label,
  error,
  secureTextEntry = false,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};