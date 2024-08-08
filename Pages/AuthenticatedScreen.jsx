import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { styles } from '../Components/Graphic features';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { storage, auth } from '../Components/Firebase';
import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage';

/**
 * Funzione che si occupa di aggiungere le password che l'utente vuole salvare e salvarla in una struttura dati apposita.
 * Nel frattempo deve salvare anche la password nel file su firebase
 * (FUNZIONE NON IMPLEMENTATA)
 * @param {*} setCreatePassword 
 * @param {*} state 
 */
const handleAddPassword = (setIsCreatePassword, state) => {
  Alert.alert('Aggiungi password', 'Funzionalità non ancora implementata.');
};

/**
 * Pagina che viene mostrata dopo aver effettuato l'accesso
 * @param {*} handleAuthentication 
 * @returns 
 */
const AuthenticatedScreen = ({ handleAuthentication }) => {
  /**
   * Struttura dati per contenere le password dell'utente e un booleano che dice se si vuole creare o meno una password
   */
  const [passwords, setPasswords] = useState([]);
  const [isCreatePassword, isSetCreatePassword] = useState(false);
  const fileName = 'passwords.json'; //DA MODIFICARE IL FORMATO DEL FILE IN CUI SALVARE LE PASSWORD

  useEffect(() => {
    loadPasswordsFromFirebase();
  }, []);
  /**
   * Funzione asincrona che si occupa di recuperare le password da firebase dell'utente che ha effettuato l'accesso
   */
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
        setPasswords(JSON.parse(fileContent)); //DA MODIFICARE NEL CASO IN CUI SI MODIFICA L'ESTENSIONE DEL FILE
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

  /**
   * Funzione che crea il file vuoto in cui salvare le password dell'utente.
   * La funzione viene evocata solo nel caso in cui non esiste ancora un file in cui salvare le password
   */
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
      <View style={position = 'absolute'}>
        <View style={styles.buttonAdd}>
          <Button title="Aggiungi password" color='#00e480' onPress={handleAddPassword} />
          <MaterialIcons name='add-circle' color='white' style={styles.materialIconsAddStyle} onPress={handleAddPassword} />
        </View>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    </View>
  );
};

export default AuthenticatedScreen;