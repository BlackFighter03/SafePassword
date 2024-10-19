import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { styles } from './Graphic features';

const SideMenu = ({ isOpen, onClose, onLogout }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const { width: screenWidth } = Dimensions.get('window');
  const menuWidth = screenWidth * 0.7;

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

      <Animated.View 
        style={{
          position: 'absolute',
          top: '4.7%',
          bottom: 0,
          left: 0,
          right: 0,
          width: menuWidth,
          backgroundColor: '#202134',
          transform: [{ translateX: menuTranslateX }],
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          justifyContent: 'flex-star',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity 
          onPress={() => {
            onClose();
          }} 
          style={styles.buttonFirstSideMenu}
        >
          <Text style={styles.textSideMenu}>Cambia password</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            onClose();
            onLogout();
          }} 
          style={styles.buttonSideMenu}
        >
          <Text style={styles.textSideMenu}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SideMenu;