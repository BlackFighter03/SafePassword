import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';

const SideMenu = ({ isOpen, onClose }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');
  const menuWidth = screenWidth * 0.7; // Aumentato la larghezza del menu al 70% dello schermo

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const menuTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-menuWidth, 0],
  });

  const overlayOpacity = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  if (!isOpen) {
    return null;
  }

  return (
    <View style={{ 
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}>
      {/* Overlay scuro animato */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: overlayOpacity,
        }}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={onClose}
        />
      </Animated.View>

      {/* Menu laterale */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: menuWidth,
          backgroundColor: '#202134',
          transform: [{ translateX: menuTranslateX }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {/* Contenuto del menu */}
        <TouchableOpacity onPress={onClose} style={{ padding: 20 }}>
          <Text>Chiudi Menu</Text>
        </TouchableOpacity>
        {/* Aggiungi qui le altre voci del tuo menu */}
      </Animated.View>
    </View>
  );
};

export default SideMenu;