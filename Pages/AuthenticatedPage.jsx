import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, FlatList } from 'react-native';
import AddPasswordModal from './AddPasswordModal';
import Item from '../Components/Item';
import { styles } from '../Components/Graphic features';
import * as FileSystem from 'expo-file-system';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { auth, storage } from '../Components/Firebase';
import { setChiaveSegreta, criptaTesto, decriptaTesto } from '../Components/PersonalKey';
import sortedStrings from '../Components/PasswordSorting';

/**
 * Componente: AuthenticatedScreen
 * Descrizione: Questa schermata viene mostrata dopo l'accesso dell'utente.
 * Gestisce la visualizzazione, l'aggiunta, la modifica e l'eliminazione delle password,
 * salvando i dati sia in Firebase Storage che nel file system del dispositivo.
 */
const AuthenticatedPage = ({ email, handleAuthentication }) => {
  // --- Definizione delle costanti ---

  // Costanti per la gestione del file delle password
  const fileName = `passwords_${email}.json`;  // Nome del file JSON
  const pathFirestore = `accounts/${fileName}`; // Percorso del file in Firebase Storage
  const storageRef = ref(storage, pathFirestore); // Riferimento al file in Firebase Storage
  const localFilePath = FileSystem.documentDirectory + fileName; // Percorso del file nel file system del dispositivo

  // --- Definizione dello stato del componente ---

  // Array di oggetti che contiene le password dell'utente
  const [decryptedPasswords, setDecryptedPasswords] = useState([]);

  // Indice dell'elemento correntemente selezionato nell'array 'passwords'
  const [index, setIndex] = useState(-1);

  // Flag per gestire la visibilità del modale di aggiunta password
  const [modalVisible, setModalVisible] = useState(false);

  // Flag per gestire la visibilità del modale di modifica password
  const [modalVisibleForChange, setModalVisibleForChange] = useState(false);

  // Variabili di stato per i campi di input del modale 
  const [websiteTemp, setWebsiteTemp] = useState('');
  const [usernameTemp, setUsernameTemp] = useState('');
  const [passwordTemp, setPasswordTemp] = useState('');

  // --- Effetto collaterale per il download iniziale delle password ---

  useEffect(() => {
    // Listener per lo stato di autenticazione di Firebase
    const unsubscribe = auth.onAuthStateChanged((user) => {
     
      if(email == null)
        handleAuthentication;
      else if (user) {
         // Se l'utente è autenticato, scarica le password da Firebase
        downloadFile();
      }
    });

    // Rimuove il listener quando il componente viene smontato
    return () => unsubscribe();
  }, []); // Esegue l'effetto solo quando il componente viene montato o smontato

  // --- Effetto collaterale per aggiornare il file locale quando 'passwords' cambia ---

  useEffect(() => {
    const updateLocalFile = async () => {
      try {
        const encryptedPasswords = decryptedPasswords.map((item) => ({
          website: criptaTesto(email, item.website),
          username: criptaTesto(email, item.username),
          password: criptaTesto(email, item.password),
        }));
  
        await FileSystem.writeAsStringAsync(
          localFilePath,
          JSON.stringify(encryptedPasswords)
        );
        console.log('File locale aggiornato con successo!');
        uploadFile();
      } catch (error) {
        console.error('Errore durante l\'aggiornamento del file locale:', error);
      }
    };

    updateLocalFile(); // Chiama la funzione per aggiornare il file all'avvio
  }, [decryptedPasswords]); // Esegui l'effetto ogni volta che 'passwords' cambia


  // --- Funzioni del componente ---

  /**
   * downloadFile: Scarica il file delle password da Firebase Storage.
   */
  const downloadFile = async () => {
    try {
      console.log('Provando a scaricare il file...');
      // Ottiene l'URL di download del file da Firebase Storage
      const downloadURL = await getDownloadURL(storageRef);
      console.log('URL di download:', downloadURL);
      // Scarica il file da Firebase Storage e lo salva nel file system del dispositivo
      const { uri: downloadedFileUri } = await FileSystem.downloadAsync(downloadURL, localFilePath);
      console.log('File scaricato in:', downloadedFileUri);
      // Sposta il file scaricato nella posizione finale nel file system
      await FileSystem.moveAsync({
        from: downloadedFileUri,
        to: localFilePath,
      });
      console.log('File spostato con successo!');
      // Legge il contenuto del file come stringa
      const fileContent = await FileSystem.readAsStringAsync(localFilePath);
      console.log('Contenuto del file:\n', fileContent);
      // Converte il contenuto del file (JSON) in un array di oggetti JavaScript
      const passwordsData = JSON.parse(fileContent);
      if (passwordsData.length > 0) {
        const decryptedData = passwordsData.map((item) => ({
          website: decriptaTesto(email, item.website),
          username: decriptaTesto(email, item.username),
          password: decriptaTesto(email, item.password),
        }));
        setDecryptedPasswords(decryptedData);
      } else {
        setDecryptedPasswords([]); 
      }
    } catch (error) {
      // Gestione degli errori durante il download
      console.log(error);
      // Se il file non esiste, crea un nuovo file vuoto
      const fileExists = await FileSystem.getInfoAsync(localFilePath);
      if (!fileExists) {
        createEmptyFileOnDevice();
      } else {
        // Altrimenti, imposta 'passwords' come un array vuoto
        setDecryptedPasswords([]);
      }
    }
  };

  /**
   * createEmptyFileOnDevice: Crea un nuovo file vuoto sul file system del dispositivo.
   */
  const createEmptyFileOnDevice = async () => {
    try {
      // Scrive un array JSON vuoto nel file specificato
      await FileSystem.writeAsStringAsync(localFilePath, JSON.stringify([]));
      console.log('File creato con successo:', localFilePath.uri);
      // Carica il file vuoto su Firebase Storage
      uploadFile();
    } catch (error) {
      console.error('Errore durante la creazione del file:', error);
    }
  };

  /**
   * uploadFile: Carica il file delle password su Firebase Storage.
   */
  const uploadFile = async () => {
    try {
      console.log('Inizio caricamento del file...');
      // Legge il contenuto del file come stringa
      const fileContent = await FileSystem.readAsStringAsync(localFilePath);
      console.log('Contenuto del file:\n', fileContent);
      // Crea un nuovo oggetto Blob dal contenuto del file
      const blob = new Blob([fileContent], { type: 'application/json' });
      // Carica il blob su Firebase Storage
      uploadBytes(storageRef, blob);
      console.log('File caricato con successo!');
    } catch (error) {
      console.error('Errore durante il caricamento del file:', error);
    }
  };

  /**
   * handleAddPassword: Gestisce l'apertura del modale per l'aggiunta di una nuova password.
   */
  const handleAddPassword = () => {
    // Reimposta i campi di input del modale
    setWebsiteTemp('');
    setUsernameTemp('');
    setPasswordTemp('');
    // Mostra il modale di aggiunta
    setModalVisible(true);
  };

  /**
   * handleSavePassword: Gestisce il salvataggio di una nuova password nell'array e l'upload su Firebase.
   */
  const handleSavePassword = async () => {
    // Chiude il modale
    setModalVisible(false);

    try {
      // Crea un nuovo oggetto con i dati della password
      const newPasswordData = {
        website: websiteTemp,
        username: usernameTemp,
        password: passwordTemp,
      };

      // Controlla se una password identica esiste già nell'array
      const isPresented = decryptedPasswords.find(
        (value) =>
          value.website === newPasswordData.website &&
          value.username === newPasswordData.username
      );

      // Se non ci sono duplicati
      if (!isPresented) {
        // Aggiorna lo stato 'passwords' aggiungendo la nuova password e ordinando l'array
        setDecryptedPasswords((prevPasswords) => [...prevPasswords, newPasswordData].sort(sortedStrings));
      } else {
        // Mostra un messaggio di avviso se la password è duplicata
        Alert.alert('Attenzione', 'Un account con lo stesso sito e nome utente è stato già salvato');
      }

      // Reimposta i campi di input
      setWebsiteTemp('');
      setUsernameTemp('');
      setPasswordTemp('');

      console.log('Password aggiunta con successo!');

    } catch (error) {
      console.error("Errore durante l'aggiunta della password:", error);
    }
  };

  /**
   * configureOpenMenu: Configura e apre il menu di gestione della password (modifica/elimina).
   * Imposta anche lo stato del componente con i dati della password selezionata.
   */
  const configureOpenMenu = (item) => {
    // Trova l'indice dell'elemento selezionato nell'array
    const index = decryptedPasswords.indexOf(item);
    // Aggiorna lo stato con l'indice e i dati dell'elemento
    setIndex(index);
    setWebsiteTemp(item.website);
    setUsernameTemp(item.username);
    setPasswordTemp(item.password);
  };

  /**
   * changePassword: Gestisce la modifica di una password esistente.
   */
  const changePassword = () => {
    // Chiude il modale di modifica
    setModalVisibleForChange(false);
    // Aggiorna lo stato 'passwords' con la password modificata
    setDecryptedPasswords((prevPasswords) =>
      prevPasswords.map((password, i) =>
        // Modifica solo la password con l'indice corrispondente
        i === index
          ? {
            ...password,
            website: websiteTemp,
            username: usernameTemp,
            password: passwordTemp,
          }
          : password // Mantiene le altre password invariate
      ).sort(sortedStrings) // Ordina l'array dopo la modifica
    );

    // Reimposta lo stato del componente
    setWebsiteTemp('');
    setUsernameTemp('');
    setPasswordTemp('');
    setIndex(-1);
  };

  /**
   * removePassword: Gestisce la rimozione di una password dall'array.
   */
  const removePassword = () => {
    // Aggiorna lo stato 'passwords' rimuovendo la password selezionata
    setDecryptedPasswords((prevPasswords) =>
      prevPasswords.filter(
        (password) =>
          // Mantiene solo le password che non corrispondono ai dati da rimuovere
          password.website !== websiteTemp ||
          password.username !== usernameTemp ||
          password.password !== passwordTemp
      )
    );

    // Reimposta lo stato del componente
    setWebsiteTemp('');
    setUsernameTemp('');
    setPasswordTemp('');
  };

  // --- Renderizzazione del componente ---

  return (
    <View style={styles.container}>
      <HeaderRNE
        backgroundColor="#00e480"
        leftComponent={
          <View>
            <TouchableOpacity onPress={handleAuthentication}>
              <Icon type="simplelineicons" name="logout" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{ text: 'Safe Password', style: styles.textHeader }}
        rightComponent={
          <View>
            <TouchableOpacity onPress={handleAddPassword}>
              <Icon type="materialicons" name="add-circle" color="white" />
            </TouchableOpacity>
          </View>
        }
      />
      <FlatList
        data={decryptedPasswords}
        extraData={decryptedPasswords.length}
        renderItem={({ item }) => (
          <Item
            item={item}
            passwords={decryptedPasswords}
            configureOpenMenu={configureOpenMenu}
            setModalVisible={setModalVisibleForChange}
            removePassword={removePassword}
          />
        )}
      />
      {/* Modale per aggiungere una nuova password */}
      <AddPasswordModal
        visible={modalVisible}
        usernameTemp={usernameTemp}
        websiteTemp={websiteTemp}
        passwordTemp={passwordTemp}
        onCancel={() => setModalVisible(false)}
        onSave={handleSavePassword}
        setWebsiteTemp={setWebsiteTemp}
        setUsernameTemp={setUsernameTemp}
        setPasswordTemp={setPasswordTemp}
      />
      {/* Modale per modificare una password esistente */}
      <AddPasswordModal
        visible={modalVisibleForChange}
        usernameTemp={usernameTemp}
        websiteTemp={websiteTemp}
        passwordTemp={passwordTemp}
        onCancel={() => setModalVisibleForChange(false)}
        onSave={changePassword}
        setWebsiteTemp={setWebsiteTemp}
        setUsernameTemp={setUsernameTemp}
        setPasswordTemp={setPasswordTemp}
      />
    </View>
  );
};

export default AuthenticatedPage;