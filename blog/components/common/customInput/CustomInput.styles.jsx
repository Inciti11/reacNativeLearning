// components/common/CustomInput/CustomInput.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
  },
});