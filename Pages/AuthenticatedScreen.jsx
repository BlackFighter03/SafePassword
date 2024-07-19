import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { styles } from '../Components/Graphic features';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as FileSystem from 'expo-file-system';

const handleAddPassword = (setCreatePassword, state) => {
  Alert.alert('Aggiungi password', 'Funzionalità non ancora implementata.');
};

const AuthenticatedScreen = ({ handleAuthentication }) => {
  const [passwords, setPasswords] = useState([]);
  const [createPassword, setCreatePassword] = useState(false);
  const fileName = 'passwords.json';

  useEffect(() => {
    createFileIfNotExist();
    loadPasswords();
  }, []);

  const createFileIfNotExist = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(FileSystem.documentDirectory + fileName);
      if (!fileExists.exists) {
        await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + fileName, '[]');
      }
    } catch (error) {
      console.error('Errore durante la creazione del file:', error);
    }
  };

  const loadPasswords = async () => {
    try {
      const fileContent = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + fileName);
      setPasswords(JSON.parse(fileContent || '[]')); // Utilizza '[]' se il file è vuoto
    } catch (error) {
      console.error('Errore nel caricamento delle password:', error);
    }
  };

  const savePasswords = async () => {
    try {
      await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + fileName, JSON.stringify(passwords));
    } catch (error) {
      console.error('Errore nel salvataggio delle password:', error);
    }
  };

    return (
      <View style={styles.container}>
        <FlatList
          data={passwords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.passwordItem}>
              <Text style={styles.passwordText}>{item.website}: {item.username}</Text>
            </View>
          )}
        />
        <View style={position='absolute'}>
        <View style={styles.buttonAdd}>
        <Button title="Aggiungi password" color='#00e480' onPress={handleAddPassword}/>
          <MaterialIcons name='add-circle' color='white' style={styles.materialIconsAddStyle} onPress={handleAddPassword}/>
        </View>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
        </View>
      </View>
    );
};

export default AuthenticatedScreen;