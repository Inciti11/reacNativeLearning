// customButton.styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        width: '100%', // Cambiado a 100% para ocupar todo el ancho disponible
        padding: 15,   // Aumentado el padding para hacerlo más alto
        borderRadius: 12, // Cambiado a 12 para coincidir con el diseño
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#5B4FE7', // Color del gradiente que usamos antes
        marginVertical: 10, // Añadido margen vertical
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // Cambiado a bold
        letterSpacing: 0.5,
        textTransform: 'none' // Removido el uppercase para coincidir con el diseño
    }
});