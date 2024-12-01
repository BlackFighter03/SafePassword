import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { sendPasswordResetEmail } from '@firebase/auth';
import { styles } from '../Components/Graphic features';
import { useState } from 'react';

const changePassword = ({ auth, visible, }) => {

  
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [info, setInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      setTitle("Avviso");
      setMsg("Nuova password impostata!");
      setInfo(true);
      handleSignInPage();
    } catch (error) {
      console.error(error);
      setTitle("Attenzione");
      setMsg("Si è verificato un errore nell'impostazione della nuova password");
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
          <View>
            <Text style={styles.text}>Inserisci la tua vecchia password</Text>
            <TextInput
              style={styles.pwdInput}
              secureTextEntry={showPassword}
              placeholder='Vecchia Password'
              onChangeText={setOldPwd}
              value={oldPwd}
            />
            {showPassword ? (
              <FontAwesome name="eye" style={styles.fontAwesomeEye} onPress={() => setShowPassword(!showPassword)} />
            ) : (
              <FontAwesome name="eye-slash" style={styles.fontAwesomeEye} onPress={() => setShowPassword(!showPassword)} />
            )}
          </View>
        </View>
        <Text style={styles.text} marginTop='5%'>Inserisci la tua password</Text>
        <View>
          <TextInput
            style={styles.pwdInput}
            secureTextEntry={showConfirmPassword}
            placeholder='Nuova password'
            onChangeText={setNewPwd}
            value={newPwd}
          />
          {showConfirmPassword ? (
            <FontAwesome name="eye" style={styles.fontAwesomeEye} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
          ) : (
            <FontAwesome name="eye-slash" style={styles.fontAwesomeEye} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
          )}
        </View>
        <View style={styles.button} marginTop='15%'>
          <Button title="Richiedi password" onPress={handleChangePassword} color='#00e480' />
        </View>
        <Table
          visible={info}
          setVisible={() => setInfo(false)}
          title={title}
          msg={msg}
        />
      </View>
    </Modal >
  );
};

export default RecoveryPassword;