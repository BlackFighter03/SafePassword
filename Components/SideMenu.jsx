import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

const SideMenu = ({ isOpen, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true, 
    }).start();
  }, [isOpen]);

  const menuTranslateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0], // Regola la larghezza del menu
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Contenuto principale */}
      <View style={{ flex: 1 }}>
        {children}
      </View>

      {/* Menu laterale */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 250,
          backgroundColor: 'white',
          transform: [{ translateX: menuTranslateX }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
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