//Da usare per mostrare all'utente le password salvate
//import { NavigationContainer } from '@react-navigation/native';
//import { option} from './Components/Graphic features';
//import Stack from './Components/Stack';
//import Login from './Pages/Login page';

import { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, Pressable, View, Button } from 'react-native';
import { styles } from './Components/Graphic features';
import Nl from './Components/Nl';
import { fb_app } from './Components/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, getAuth } from '@firebase/auth';

//Da aggiungere la funzione per la verifica dell'iscrizione corretta

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.container} marginTop='30%'>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

const SchermataIniziale = ({ isLogin, setIsLogin, email, setEmail, password, setPassword, handleAuthentication }) => {
  console.log(isLogin+" scelta");
  if(isLogin==false) {
    return (
      // Mostra la schermata per il sign-up se l'utente non è autenticato
      <View style={styles.container}>
      <Text style={styles.titleSetting}>Safe Password</Text>
        <View style={styles.container}>
        <View marginTop='15%'>
            <Text style={styles.textSetting}>Inserisci indirizzo email</Text>
            <TextInput style={styles.textInputSetting} placeholder='example@email.com' autoCapitalize = "none" onChangeText={setEmail} value={email}></TextInput>
            <Text style={styles.textSetting} marginTop='5%'>Inserisci password</Text>
            <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Password' onChangeText={setPassword} value={password}></TextInput>
            <Text style={styles.textSetting} marginTop='5%'>Ripeti password</Text>
            <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Conferma password'></TextInput>
        </View>
        <View marginTop='20%' marginLeft='30%' marginRight='30%'>
            <Button title='Iscriviti' style={styles.buttonSetting} onPress={handleAuthentication} color='#00e480'/>
        </View>
        <View marginTop='12%'>
            <Text style={styles.subtextSetting}>Sei già iscritto?</Text>
            <View>
              <Pressable style={styles.buttonSetting}>
                <Text style={styles.linkSetting} onPress={() => {setIsLogin(!isLogin)}}>{"Esegui l'accesso"}</Text>
              </Pressable>
            </View>
        </View>
        </View>
        <Nl />
        <Nl />
        <Nl />
    </View>
    );
  }else{
      return(
      // Mostra la schermata per il sign-in se l'utente non è autenticato
      <View style={styles.container}>
      <Text style={styles.titleSetting}>Safe Password</Text>
      <View style={styles.container}>
        <View marginTop='20%' id='SignIn'>
        <Text style={styles.textSetting}>Inserisci indirizzo email </Text>
        <TextInput style={styles.textInputSetting} value={email} onChangeText={setEmail} placeholder="example@email.com" autoCapitalize = "none"/>
        <Text style={styles.textSetting} marginTop='10%'>Inserisci password</Text>
        <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder="Password" value={password} onChangeText={setPassword}/>
        <View style={styles.buttonSetting} marginTop='25%'>
            <Button title="Esegui l'accesso" onPress={handleAuthentication} color='#00e480'/>
        </View>
        <View marginTop='20%'>
            <Text style={styles.subtextSetting}>Non sei ancora iscritto? </Text>
            <View>
              <Pressable style={styles.buttonSetting}>
                <Text style={styles.linkSetting} onPress={() => {setIsLogin(!isLogin)}}>{"Crea un account"}</Text>
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
  }
}



export default function App() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null); // Tracciatore per l'autenticazione dell'utente
    const [isLogin, setIsLogin] = useState(true);

    const auth = getAuth(fb_app);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
    
        return () => unsubscribe();
      }, [auth]);

    const handleAuthentication = async () => {
      try {
        if (user) {
          // Se l'utente è già autenticato => log out
          console.log('User logged out successfully!');
          await signOut(auth);
        } else {
          // Sign in o sign up
          if (isLogin) {
            // Sign in
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully!');
          } else {
            //Sign up
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User created successfully!');
          }
        }
      } catch (error) {
        console.error('Authentication error:', error.message);
      }
    };

    return (
        <View style={styles.container}>
              {user ? (
                  //Mostra la schermata successiva se l'utente è autenticato
                          <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication}/>
                       ) : (
                        <SchermataIniziale
                        auth={auth}
                        isLogin={isLogin}
                        setIsLogin={setIsLogin}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleAuthentication={handleAuthentication}
                        />
                      )}
        </View>
    );

//Da usare per mostrare all'utente le password salvate
//    return (
//      <NavigationContainer style={{ backgroundColor: '#202134'  }}>
//          <Stack.Navigator screenOptions={{ presentation: 'transparentModal' }}>
//              <Stack.Screen name="Login" component={Login} options={option.navigationHeaderLogin} />
//          </Stack.Navigator>
//      </NavigationContainer>
//    );
};