// components/common/slidePanel/SlidePanel.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { styles } from './SlidePanel.styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SlidePanel = ({ 
  children, 
  mode = 'drawer',
  initiallyOpen = true,
  handleHeight = 40,
  style,
  handleBarStyle,
  contentContainerStyle,
  isVisible,
  onClose,
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(initiallyOpen);
  const [panelHeight, setPanelHeight] = useState(0);
  const translateY = useRef(new Animated.Value(mode === 'fullscreen' ? SCREEN_HEIGHT : 0)).current;
  const timeoutRef = useRef(null);

  const isFullscreenMode = mode === 'fullscreen';

  // Lógica exclusiva para modo drawer
  const handleDrawerLayout = (height) => {
    setPanelHeight(height);
    // Calculamos la posición inicial considerando solo la altura del handle
    const initialPosition = initiallyOpen ? 0 : height - handleHeight;
    translateY.setValue(initialPosition);
  };

  const toggleDrawerPanel = () => {
    if (panelHeight === 0) return;
    // Ajustamos el valor final para que solo quede visible el handle
    const toValue = isPanelOpen ? panelHeight - handleHeight : 0;
    Animated.timing(translateY, {
      toValue,
      duration: 600,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    }).start();
    setIsPanelOpen(!isPanelOpen);
  };

  // Lógica exclusiva para modo fullscreen
  const handleFullscreenLayout = (height) => {
    setPanelHeight(height);
  };

  const showFullscreenPanel = () => {
    translateY.setValue(SCREEN_HEIGHT);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const hideFullscreenPanel = () => {
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

  // Efecto para manejar initiallyOpen
  useEffect(() => {
    if (!isFullscreenMode) {
      // Ajustamos la posición inicial cuando cambia initiallyOpen
      translateY.setValue(initiallyOpen ? 0 : panelHeight - handleHeight);
      setIsPanelOpen(initiallyOpen);
    }
  }, [initiallyOpen, isFullscreenMode, panelHeight]);

  useEffect(() => {
    if (isFullscreenMode && isVisible) {
      showFullscreenPanel();
    }
  }, [isVisible]);

  const onPanelLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (isFullscreenMode) {
        handleFullscreenLayout(height);
      } else {
        handleDrawerLayout(height);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Renderizado para modo fullscreen
  if (isFullscreenMode) {
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
                })
              }
            ]} 
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.container,
            styles.fullscreenContainer,
            style,
            {
              transform: [{ translateY }]
            }
          ]}
          onLayout={onPanelLayout}
        >
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={hideFullscreenPanel}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <View style={[styles.contentContainer, contentContainerStyle]}>
            {children}
          </View>
        </Animated.View>
      </>
    );
  }

  // Renderizado para modo drawer
  return (
    <Animated.View
      style={[
        styles.container,
        styles.drawerContainer,
        style,
        {
          transform: [{ translateY }]
        }
      ]}
      onLayout={onPanelLayout}
    >
      <TouchableOpacity 
        style={styles.drawerHandle} 
        onPress={toggleDrawerPanel}
      >
        <View style={[styles.handleBar, handleBarStyle]} />
      </TouchableOpacity>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>
    </Animated.View>
  );
};

export default SlidePanel;