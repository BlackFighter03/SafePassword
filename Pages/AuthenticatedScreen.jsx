import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { styles } from '../Components/Graphic features';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { storage, auth } from '../Components/Firebase';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';

const handleAddPassword = (setCreatePassword, state) => {
  Alert.alert('Aggiungi password', 'Funzionalità non ancora implementata.');
};

const AuthenticatedScreen = ({ handleAuthentication }) => {
  const [passwords, setPasswords] = useState([]);
  const [createPassword, setCreatePassword] = useState(false);
  const fileName = 'passwords.json';

  useEffect(() => {
    loadPasswordsFromFirebase();
  }, []);

  const loadPasswordsFromFirebase = async () => {
    try {
      const userId = auth.currentUser.uid;
      const filePath = `users/${userId}/passwords.json`;
      const storageRef = ref(getStorage(), filePath); // Crea riferimento con getStorage()

      // Prova a scaricare il file
      try { 
        const url = await getDownloadURL(storageRef);
        const response = await fetch(url);
        const fileContent = await response.text();
        setPasswords(JSON.parse(fileContent));
      } catch (downloadError) { 
        // Gestisci l'errore di download, 
        // probabilmente perché il file non esiste
        if (downloadError.code === 'storage/object-not-found') {
          // Crea un file vuoto se non esiste
          await createEmptyFileOnFirebase(filePath);
          setPasswords([]);
        } else {
          // Errore diverso da "file non trovato"
          console.error('Errore nel download del file:', downloadError);
          // Gestisci l'errore in modo appropriato, 
          // ad esempio, mostrando un messaggio all'utente
        }
      }

    } catch (error) {
      console.error('Errore nel caricamento delle password:', error);
      // Gestisci l'errore in modo appropriato
    }
  };

  const createEmptyFileOnFirebase = async (filePath) => {
    try {
      const storageRef = ref(getStorage(), filePath);
      await uploadString(storageRef, '[]', 'raw'); // Carica una stringa vuota
    } catch (error) {
      console.error('Errore nella creazione del file:', error);
      // Gestisci l'errore in modo appropriato
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