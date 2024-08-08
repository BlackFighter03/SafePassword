import { useState } from 'react';
import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { View, Text, TextInput, Button, Pressable, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../../Components/Graphic features';
import { auth } from '../../Components/Firebase';
import { sendPasswordResetEmail } from '@firebase/auth';
import { FontAwesome } from '@expo/vector-icons';


/**
 * 
 * @param {*} user
 * @param {*} isLogin 
 * @param {*} setIsLogin
 * @param {*} email
 * @param {*} setEmail
 * @param {*} password
 * @param {*} setPassword
 * @param {*} confirmPassword
 * @param {*} setConfirmPassword
 * @param {*} handleAuthentication
 * @returns Pagina per eseguire l'accesso, l'iscrizione o il recupero password
 */
const AuthenticationForm = ({
  isLogin,
  setIsLogin,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleAuthentication,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [showSignInPage, setShowSignInPage] = useState(true);

  const handleForgotPassword = () => {
    setForgotPasswordEmail('');
    setShowSignInPage(false);
    setShowForgotPasswordForm(true);
  };

  const handleSignInPage = async () => {
    setShowForgotPasswordForm(false);
    setShowSignInPage(true);
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, forgotPasswordEmail);
      Alert.alert('', 'Email di recupero password inviata!');
      handleSignInPage();
    } catch (error) {
      console.error(error);
      Alert.alert("Errore durante l'invio dell'email di recupero.");
    }
  };



  if (isLogin) {
    return (
      <View style={styles.container}>
        /*Esegue un if per se mostrare la schermata di recupero password oppure quella per accedere o iscriversi*/
        {showForgotPasswordForm && (
          <View style={styles.container}>
            <TouchableOpacity onPress={handleSignInPage}>
              <HeaderRNE
                backgroundColor='#00e480'
                leftComponent={
                  <View>
                    <TouchableOpacity onPress={handleSignInPage}>
                      <Icon type="ionicon" name="return-up-back-outline" color="white" />
                    </TouchableOpacity>
                  </View>
                }
                centerComponent={{ text: 'Ritorna al login', style: styles.textHeaderSetting, onPress: handleSignInPage }}
              />
            </TouchableOpacity>
            <View style={styles.container} marginTop='20%'>
              <Text style={styles.textSetting}>Inserisci la tua email:</Text>
              <TextInput style={styles.textInputSetting} placeholder="example@email.com" autoCapitalize="none" onChangeText={setForgotPasswordEmail} value={forgotPasswordEmail} />
              <View style={styles.buttonSetting} marginTop='15%'>
                <Button title="Richiedi password" onPress={handleResetPassword} color='#00e480' />
              </View>
              <View marginTop='15%'>
              </View>
            </View>
          </View>
        )}
        {showSignInPage && (
          <View style={styles.container}>
            <Text style={styles.titleSetting}>Safe Password</Text>
            <View style={styles.container} marginTop='20%'>
              <Text style={styles.textSetting}>Inserisci indirizzo email </Text>
              <TextInput style={styles.textInputSetting} value={email} onChangeText={setEmail} placeholder="example@email.com" autoCapitalize="none" />
              <Text style={styles.textSetting} marginTop='10%'>Inserisci password</Text>
              <View>
                <TextInput
                  style={styles.pwdInputSetting}
                  secureTextEntry={showPassword}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                />
                {showPassword ? (
                  <FontAwesome name="eye" style={styles.fontAwesomeEyeSettingStyle} onPress={() => setShowPassword(!showPassword)} />
                ) : (
                  <FontAwesome style={styles.fontAwesomeEyeSettingStyle} name="eye-slash" onPress={() => setShowPassword(!showPassword)} />
                )}
              </View>
              <View style={styles.buttonSetting} marginTop='20%'>
                <Button title="Esegui l'accesso" onPress={handleAuthentication} color='#00e480' />
              </View>
              <View marginTop='15%'>
                <Text style={styles.subtextSetting}>Hai dimenticato la password? </Text>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.linkSetting}>Recupera password</Text>
                </TouchableOpacity>
              </View>
              <View marginTop='12%'>
                <Text style={styles.subtextSetting}>Non sei ancora iscritto? </Text>
                <View>
                  <Pressable style={styles.buttonSetting}>
                    <Text style={styles.linkSetting} onPress={() => {
                      setIsLogin(!isLogin);
                      setEmail();
                      setPassword();
                      setConfirmPassword();
                      setShowPassword(true);
                    }}>{"Crea un account"}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.titleSetting}>Safe Password</Text>
        <View marginTop='15%'>
          <Text style={styles.textSetting}>Inserisci indirizzo email</Text>
          <TextInput style={styles.textInputSetting} placeholder='example@email.com' autoCapitalize="none" onChangeText={setEmail} value={email} />
          <Text style={styles.textSetting} marginTop='5%'>Inserisci password</Text>
          <View>
            <TextInput
              style={styles.pwdInputSetting}
              secureTextEntry={showPassword}
              placeholder='Password'
              onChangeText={setPassword}
              value={password}
            />
            {showPassword ? (
              <FontAwesome name="eye" style={styles.fontAwesomeEyeSettingStyle} onPress={() => setShowPassword(!showPassword)} />
            ) : (
              <FontAwesome name="eye-slash" style={styles.fontAwesomeEyeSettingStyle} onPress={() => setShowPassword(!showPassword)} />
            )}
          </View>
        </View>
        <Text style={styles.textSetting} marginTop='5%'>Ripeti password</Text>
        <View>
          <TextInput
            style={styles.pwdInputSetting}
            secureTextEntry={showConfirmPassword}
            placeholder='Conferma password'
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
          {showConfirmPassword ? (
            <FontAwesome name="eye" style={styles.fontAwesomeEyeSettingStyle} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
          ) : (
            <FontAwesome name="eye-slash" style={styles.fontAwesomeEyeSettingStyle} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
          )}
        </View>
        <View marginTop='20%' marginLeft='30%' marginRight='30%'>
          <Button title='Iscriviti' style={styles.buttonSetting} onPress={handleAuthentication} color='#00e480' />
        </View>
        <View marginTop='12%'>
          <Text style={styles.subtextSetting}>Sei già iscritto?</Text>
          <Pressable style={styles.buttonSetting}>
            <Text style={styles.linkSetting} onPress={() => {
              setIsLogin(!isLogin);
              setPassword();
              setShowPassword(true);
            }}>{"Esegui l'accesso"}</Text>
          </Pressable>
        </View>
      </View>
    );
  }
};

export default AuthenticationForm;