// components/common/slidePanel/SlidePanel.jsx - MODIFICADO CON forwardRef

import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle, // Importar hook
  forwardRef,         // Importar HOC
} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
// Asegúrate que la ruta a tus estilos sea correcta
import { styles } from './SlidePanel.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// 1. Envolver el componente con forwardRef
const SlidePanel = forwardRef(({
  children,
  mode = 'drawer',
  initiallyOpen = true, // AuthScreen pasa 'false', este valor será usado
  handleHeight = 40,
  style,
  handleBarStyle,
  contentContainerStyle,
  isVisible, // Para modo fullscreen
  onClose,    // Para modo fullscreen
}, ref) => { // <- Recibe 'ref' como segundo argumento

  // ----- Lógica Original (sin cambios iniciales) -----
  const [isPanelOpen, setIsPanelOpen] = useState(initiallyOpen);
  const [panelHeight, setPanelHeight] = useState(0);
  // Inicializa translateY basado en el estado inicial y modo
  // (La lógica del efecto ajustará la posición inicial del drawer cuando se conozca la altura)
  const translateY = useRef(new Animated.Value(
    mode === 'fullscreen' ? SCREEN_HEIGHT : (initiallyOpen ? 0 : SCREEN_HEIGHT) // Inicia drawer fuera si initiallyOpen=false
  )).current;
  const timeoutRef = useRef(null);

  const isFullscreenMode = mode === 'fullscreen';

  // --- Funciones internas para controlar el panel ---

  // Lógica para abrir/cerrar/alternar el modo DRAWER
  const openDrawerPanel = () => {
    if (panelHeight === 0 || isPanelOpen) return; // No abrir si no hay altura o ya está abierto
    setIsPanelOpen(true);
    Animated.timing(translateY, {
      toValue: 0, // Posición abierta
      duration: 600, // Mantener tu duración/easing
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeDrawerPanel = () => {
    if (panelHeight === 0 || !isPanelOpen) return; // No cerrar si no hay altura o ya está cerrado
    setIsPanelOpen(false);
    const toValue = panelHeight - handleHeight; // Deja visible solo el handle
    Animated.timing(translateY, {
      toValue,
      duration: 600,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const toggleDrawerPanel = () => {
    if (panelHeight === 0) return;
    if (isPanelOpen) {
      closeDrawerPanel();
    } else {
      openDrawerPanel();
    }
  };

  // Lógica para mostrar/ocultar el modo FULLSCREEN (tu lógica original)
  const showFullscreenPanel = () => {
    // Podrías querer actualizar isPanelOpen aquí también si es relevante
    // setIsPanelOpen(true);
    translateY.setValue(SCREEN_HEIGHT); // Asegurar que parte desde abajo
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const hideFullscreenPanel = () => {
     // setIsPanelOpen(false);
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && onClose) {
        onClose();
      }
    });
  };

  // --- Hooks useEffect (manteniendo tu lógica original + ajustes) ---

  // Efecto para ajustar la posición inicial del DRAWER una vez se conoce la altura
  useEffect(() => {
    if (!isFullscreenMode && panelHeight > 0) {
        // Establece la posición inicial correcta basada en initiallyOpen
        const initialPosition = initiallyOpen ? 0 : panelHeight - handleHeight;
        translateY.setValue(initialPosition);
        // Asegura que el estado interno coincida con la prop inicial
        setIsPanelOpen(initiallyOpen);
    }
  }, [initiallyOpen, isFullscreenMode, panelHeight, handleHeight]); // Dependencias clave

  // Efecto para manejar la visibilidad del modo FULLSCREEN (tu lógica original)
  useEffect(() => {
    if (isFullscreenMode && isVisible) {
      showFullscreenPanel();
    } else if (isFullscreenMode && !isVisible) {
       // Opcional: Ocultar si isVisible cambia a false mientras está abierto
       // if (isPanelOpen) hideFullscreenPanel();
    }
  }, [isVisible, isFullscreenMode]);

  // Efecto para obtener la altura en el layout (tu lógica original)
  const onPanelLayout = (event) => {
    const { height } = event.nativeEvent.layout;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Usamos un timeout pequeño para evitar múltiples llamadas en el layout
    timeoutRef.current = setTimeout(() => {
      if (height > 0 && height !== panelHeight) { // Solo actualiza si la altura es válida y diferente
         setPanelHeight(height);
      }
    }, 50); // Reducido el timeout un poco
  };

  // Limpieza del timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  // 2. Usar useImperativeHandle para exponer métodos al padre (AuthScreen)
  useImperativeHandle(ref, () => ({
    open: () => {
      if (mode === 'drawer') {
        openDrawerPanel();
      } else if (mode === 'fullscreen') {
        // El modo fullscreen se controla más por 'isVisible', pero podemos exponer 'show'
        showFullscreenPanel();
      }
    },
    close: () => {
      if (mode === 'drawer') {
        closeDrawerPanel();
      } else if (mode === 'fullscreen') {
        hideFullscreenPanel();
      }
    },
    toggle: () => {
      if (mode === 'drawer') {
        toggleDrawerPanel();
      } else if (mode === 'fullscreen') {
        // Toggle no aplica directamente a fullscreen, quizás mapearlo a 'close'?
        console.warn("Toggle llamado en SlidePanel modo fullscreen. Ejecutando close().");
        hideFullscreenPanel();
      }
    },
    // Podrías exponer el estado si fuera necesario, pero es mejor usar métodos
    // getIsExpanded: () => isPanelOpen,
  }));


  // ----- Renderizado Original (sin cambios) -----

  // Renderizado para modo fullscreen
  if (isFullscreenMode) {
    // Nota: El control principal es 'isVisible'. Si !isVisible, no se renderiza nada.
    if (!isVisible) return null;

    return (
      <>
        <TouchableWithoutFeedback onPress={hideFullscreenPanel}>
          <Animated.View
            style={[
              styles.overlay,
              {
                opacity: translateY.interpolate({
                  inputRange: [0, SCREEN_HEIGHT],
                  outputRange: [1, 0],
                  extrapolate: 'clamp', // Añadir extrapolate por seguridad
                })
              }
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.container, // Estilo base
            styles.fullscreenContainer, // Estilo específico fullscreen
            style, // Estilos del padre (AuthScreen)
            {
              transform: [{ translateY }] // Animación
            }
          ]}
          onLayout={onPanelLayout} // Medir altura
        >
          {/* Botón de cierre para fullscreen */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={hideFullscreenPanel}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          {/* Contenido */}
          <View style={[styles.contentContainer, contentContainerStyle]}>
            {children}
          </View>
        </Animated.View>
      </>
    );
  }

  // Renderizado para modo drawer (el que usa AuthScreen)
  return (
    <Animated.View
      style={[
        styles.container,      // Estilo base
        styles.drawerContainer, // Estilo específico drawer
        style,                // Estilos del padre (AuthScreen)
        {
          // Importante: Asegura que la altura se establezca si es necesario en los estilos base/drawer
          // o que el contenido interno defina la altura para que onLayout funcione.
          transform: [{ translateY }] // Animación
        }
      ]}
      onLayout={onPanelLayout} // Medir altura
    >
      {/* El handle/barra para arrastrar/tocar */}
      <TouchableOpacity
        style={[styles.drawerHandle, { height: handleHeight }]} // Usa la prop handleHeight
        onPress={toggleDrawerPanel} // Llama a la función interna de toggle
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Área de toque más grande
      >
        <View style={[styles.handleBar, handleBarStyle]} />
      </TouchableOpacity>
      {/* Contenido */}
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </Animated.View>
  );
}); // <- Cierra el forwardRef

export default SlidePanel;