import { View, Text, TextInput, Button, Pressable } from 'react-native';
import { styles } from '../Graphic features';
import Nl from '../Nl';

const AuthenticationForm = ({ isLogin, setIsLogin, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleAuthentication }) => {
    if (isLogin) {
      return (
        <View style={styles.container}>
          <Text style={styles.titleSetting}>Safe Password</Text>
          <View style={styles.container}>
            <View marginTop='20%' id='SignIn'>
              <Text style={styles.textSetting}>Inserisci indirizzo email </Text>
              <TextInput style={styles.textInputSetting} value={email} onChangeText={setEmail} placeholder="example@email.com" autoCapitalize="none" />
              <Text style={styles.textSetting} marginTop='10%'>Inserisci password</Text>
              <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword} />
              <View style={styles.buttonSetting} marginTop='25%'>
                <Button title="Esegui l'accesso" onPress={handleAuthentication} color='#00e480' />
              </View>
              <View marginTop='20%'>
                <Text style={styles.subtextSetting}>Non sei ancora iscritto? </Text>
                <View>
                  <Pressable style={styles.buttonSetting}>
                    <Text style={styles.linkSetting} onPress={() => { setIsLogin(!isLogin) }}>{"Crea un account"}</Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Nl />
            <Nl />
            <Nl />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.titleSetting}>Safe Password</Text>
          <View style={styles.container}>
            <View marginTop='15%'>
              <Text style={styles.textSetting}>Inserisci indirizzo email</Text>
              <TextInput style={styles.textInputSetting} placeholder='example@email.com' autoCapitalize="none" onChangeText={setEmail} value={email} />
              <Text style={styles.textSetting} marginTop='5%'>Inserisci password</Text>
              <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Password' onChangeText={setPassword} value={password} />
              <Text style={styles.textSetting} marginTop='5%'>Ripeti password</Text>
              <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Conferma password' onChangeText={setConfirmPassword} value={confirmPassword}/>
            </View>
            <View marginTop='20%' marginLeft='30%' marginRight='30%'>
              <Button title='Iscriviti' style={styles.buttonSetting} onPress={handleAuthentication} color='#00e480' />
            </View>
            <View marginTop='12%'>
              <Text style={styles.subtextSetting}>Sei già iscritto?</Text>
              <View>
                <Pressable style={styles.buttonSetting}>
                  <Text style={styles.linkSetting} onPress={() => { setIsLogin(!isLogin) }}>{"Esegui l'accesso"}</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Nl />
          <Nl />
          <Nl />
        </View>
      );
    }
  };

  export default AuthenticationForm;