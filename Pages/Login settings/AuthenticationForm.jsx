import { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, TouchableOpacity, Touchable } from 'react-native';
import { styles } from '../../Components/Graphic features';
import { FontAwesome } from '@expo/vector-icons';

//Da rivedere l'icona per la visibilità della password

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
  if (isLogin) {
    return (
      <View style={styles.container}>
        <Text style={styles.titleSetting}>Safe Password</Text>
        <View style={styles.container}>
          <View marginTop='20%' id='SignIn'>
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
                  <FontAwesome name="eye" style={styles.fontAwesomeEyeSetting} color="black" onPress={() => setShowPassword(!showPassword)}/>
                ) : (
                  <FontAwesome style={styles.fontAwesomeEyeSetting} name="eye-slash" color="black" onPress={() => setShowPassword(!showPassword)}/>
                )}
            </View>
            <View style={styles.buttonSetting} marginTop='25%'>
              <Button title="Esegui l'accesso" onPress={handleAuthentication} color='#00e480' />
            </View>
            <View marginTop='20%'>
              <Text style={styles.subtextSetting}>Non sei ancora iscritto? </Text>
              <View>
                <Pressable style={styles.buttonSetting}>
                  <Text style={styles.linkSetting} onPress={() => {
                    setIsLogin(!isLogin);
                    setPassword();
                    setShowPassword(true);
                   }}>{"Crea un account"}</Text>
                </Pressable>
              </View>
            </View>
          </View>
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
            <View>
              <TextInput
                style={styles.pwdInputSetting}
                secureTextEntry={showPassword}
                placeholder='Password'
                onChangeText={setPassword}
                value={password}
              />
                {showPassword ? (
                  <FontAwesome name="eye" style={styles.fontAwesomeEyeSetting} color="black" onPress={() => setShowPassword(!showPassword)}/>
                ) : (
                  <FontAwesome name="eye-slash" style={styles.fontAwesomeEyeSetting} color="black" onPress={() => setShowPassword(!showPassword)}/>
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
                  <FontAwesome name="eye" style={styles.fontAwesomeEyeSetting} color="black" onPress={() => setShowConfirmPassword(!showConfirmPassword)}/>
                ) : (
                  <FontAwesome name="eye-slash" style={styles.fontAwesomeEyeSetting} color="black" onPress={() => setShowConfirmPassword(!showConfirmPassword)}/>
                )}
            </View>
          <View marginTop='20%' marginLeft='30%' marginRight='30%'>
            <Button title='Iscriviti' style={styles.buttonSetting} onPress={handleAuthentication} color='#00e480' />
          </View>
          <View marginTop='12%'>
            <Text style={styles.subtextSetting}>Sei già iscritto?</Text>
            <View>
              <Pressable style={styles.buttonSetting}>
                <Text style={styles.linkSetting} onPress={() => {
                  setIsLogin(!isLogin);
                  setPassword();
                  setShowPassword(true);
                  }}>{"Esegui l'accesso"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    );
  }
};

export default AuthenticationForm;