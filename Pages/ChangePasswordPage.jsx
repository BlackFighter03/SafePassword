import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from '@firebase/auth';
import { styles } from '../Components/Graphic features';
import { useState } from 'react';

const changePassword = ({ auth, visible, }) => {

  const msg = new Map();
  const [info, setInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      msg.set("title", "Avviso");
      msg.set("info", "Nuova password impostata!");
      setInfo(true);
      handleSignInPage();
    } catch (error) {
      console.error(error);
      msg.set("title", "Attenzione");
      msg.set("info", "Si è verificato un errore durante l'invio dell'email di recupero");
      setInfo(true);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <HeaderRNE
          backgroundColor='#00e480'
          leftComponent={
            <View>
              <TouchableOpacity onPress={handleSignInPage}>
                <Icon type="ionicon" name="return-up-back-outline" color="white" />
              </TouchableOpacity>
            </View>
          }
          centerComponent={{ text: 'Cambia password', style: styles.textHeader, onPress: handleSignInPage }}
        />
        <View style={styles.container} marginTop='20%'>
          <Text style={styles.text}>Inserisci la tua vecchia password:</Text>
          <TextInput style={styles.textInput} autoCapitalize="none" onChangeText={setForgotPasswordEmail} value={forgotPasswordEmail} />
          </View>
          <View style={styles.button} marginTop='15%'>
          <Text style={styles.text}>Inserisci la tua nuova password:</Text>
          <TextInput style={styles.textInput} autoCapitalize="none" onChangeText={setForgotPasswordEmail} value={forgotPasswordEmail} />
          </View>
          <View style={styles.button} marginTop='15%'>
            <Button title="Richiedi password" onPress={handleChangePassword} color='#00e480' />
          </View>
        </View>
        <Table
          visible={info}
          setVisible={() => setInfo(false)}
          title={msg.get("title")}
          msg={msg.get("info")}
        />
      </View>
    </Modal>
  );
};

export default RecoveryPassword;