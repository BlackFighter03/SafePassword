import { View, Modal, TextInput, Button, Text } from 'react-native';
import { styles } from '../Components/Graphic features';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const AddPasswordModal = ({ websiteTemp, usernameTemp, passwordTemp, visible, onCancel, onSave, setWebsiteTemp, setUsernameTemp, setPasswordTemp }) => {

  /* Costanti che servono a mostrare le informazioni che l'utente non ha messo */
  const [websiteVoid, setWebsiteVoid] = useState(false);
  const [usernameVoid, setUsernameVoid] = useState(false);
  const [passwordVoid, setPasswordVoid] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [inputPercentualSetting, setInputPercentualSetting] = useState('50%');

  const handleSave = () => {
    setWebsiteTemp(websiteTemp.trim());
    setUsernameTemp(usernameTemp.trim());
    setPasswordTemp(passwordTemp.trim());

    if (websiteTemp == "" || usernameTemp == "" || passwordTemp == ""){
      let count = 0;
      if(websiteTemp == ""){
        count++;
        setWebsiteVoid(true);
      }
      else
       setWebsiteVoid(false);

      if(usernameTemp == ""){
        setUsernameVoid(true);
        count++;
      }else
        setUsernameVoid(false);
      if(passwordTemp == ""){
        setPasswordVoid(true);
        count++;
      }else
        setPasswordVoid(false);
        let percentualInput = 5 - count;
        setInputPercentualSetting(percentualInput + "0%");

    }else{
      setWebsiteVoid(false);
      setUsernameVoid(false);
      setPasswordVoid(false);
      setInputPercentualSetting("50%");
      onSave();
    }
  };

  const reset = () => {
    setWebsiteTemp("");
    setUsernameTemp("");
    setPasswordTemp("");
    setInputPercentualSetting("50%");
    setWebsiteVoid(false);
    setUsernameVoid(false);
    setPasswordVoid(false);
    setShowPassword(true);
    onCancel();
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <View marginTop={inputPercentualSetting}>
          <Text style={styles.text} marginTop='5%'>Inserisci il nome del sito</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Sito Web"
            onChangeText={setWebsiteTemp}
            value={websiteTemp}
          />
          <Text style={styles.text} marginTop='5%'>Inserisci l'username (o email) </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nome Utente"
            onChangeText={setUsernameTemp}
            value={usernameTemp}
          />
          <Text style={styles.text} marginTop='5%'>Inserisci la password</Text>
          <View>
          <TextInput
            style={styles.pwdInput}
            placeholder="Password"
            onChangeText={setPasswordTemp}
            value={passwordTemp}
            secureTextEntry={showPassword}
          />
          {showPassword ? (
                  <FontAwesome name="eye" style={styles.fontAwesomeEye} onPress={() => setShowPassword(!showPassword)} />
                ) : (
                  <FontAwesome style={styles.fontAwesomeEye} name="eye-slash" onPress={() => setShowPassword(!showPassword)} />
                )}
          </View>
          {websiteVoid ?
            <View marginTop="10%">
              <Text style={styles.textWarning}>Non hai inserito il sito</Text>
            </View>
            :
            null
          }

          {usernameVoid ?
            <View marginTop="10%">
              <Text style={styles.textWarning}>Non hai inserito l'username o l'email</Text>
            </View>
            :
            null
          }

          {passwordVoid ?
            <View marginTop="10%">
              <Text style={styles.textWarning}>Non hai inserito la password</Text>
            </View>
            :
            null
          }
          <View style={styles.buttonContainer} marginTop={inputPercentualSetting}>
            <Button title="Annulla" onPress={reset} color="red" />
            <Button title="Salva" onPress={handleSave} color="#00e480" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddPasswordModal;