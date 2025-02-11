// components/common/slidePanel/SlidePanel.styles.jsx
import { StyleSheet, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  drawerContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingTop: 0,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // Añadimos bottom: 0
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT + 100, // Añadimos un poco más de altura para compensar
    zIndex: 1000,
    paddingBottom: 50, // Añadimos padding en la parte inferior
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
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
  contentContainer: {
    width: '100%',
    flex: 1, // Añadimos flex: 1
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    zIndex: 1001,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
  },
});