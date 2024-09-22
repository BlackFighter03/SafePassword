import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from '@firebase/auth';
import { styles } from '../Components/Graphic features';

const RecoveryPassword = ({auth, visible, forgotPasswordEmail, setForgotPasswordEmail, handleSignInPage}) => {

    const handleResetPassword = async () => {
        try {
          await sendPasswordResetEmail(auth, forgotPasswordEmail);
          Alert.alert('Avviso', 'Email di recupero password inviata!');
          handleSignInPage();
        } catch (error) {
          console.error(error);
          Alert.alert("Attenzione", "Si è verificato un errore durante l'invio dell'email di recupero.");
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
                centerComponent={{ text: 'Recupera password', style: styles.textHeader, onPress: handleSignInPage }}
              />
              <View style={styles.container} marginTop='20%'>
                <Text style={styles.text}>Inserisci la tua email:</Text>
                <TextInput style={styles.textInput} placeholder="example@email.com" autoCapitalize="none" onChangeText={setForgotPasswordEmail} value={forgotPasswordEmail} />
                <View style={styles.button} marginTop='15%'>
                  <Button title="Richiedi password" onPress={handleResetPassword} color='#00e480' />
                </View>
                <View marginTop='15%'>
                </View>
              </View>
            </View>
          </Modal>
    );
};

export default RecoveryPassword;