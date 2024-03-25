import { useState } from 'react';
import { Text, TextInput, Pressable, View, Button } from 'react-native';
import { styles } from '../Components/Graphic features';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Nl from '../Components/Nl';
import SignUp from './SignUp page';
//import { firebaseConfig, fb_app, fb_auth, fb_db } from '../Components/Firebase';
//import { signInWithEmailAndPassword } from 'firebase/auth';

//Da aggiustare il login: Video super easy react native authe... 14.17

export default Login = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading,setLoading] = useState(false);
//	const auth=fb_auth;

//	const signIn = async () => {
//		setLoading(true);
//		try {
//			const response = await auth.signInWithEmailAndPassword(auth, email, password);
//			console.log(response);
//		} catch (error) {
//			console.log(error);
//			alert("Errore: " + error.message);
//		} finally {
//			setLoading(false);
//		}
//	}


    return (
        <View style={styles.container}>
            <Text style={styles.titleSetting}>Password Safe</Text>
            <View marginTop='20%'>
                <Text style={styles.textSetting}>Inserisci indirizzo email </Text>
                <Nl />
                <TextInput style={styles.textInputSetting} placeholder='example@email.com' autoCapitalize = "none" onChangeText = {(text) => setEmail(text)} value={ email } />
                <Nl />
                <Text style={styles.textSetting}>Inserisci password </Text>
                <Nl />
                <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Password' autoCapitalize = "none" onChangeText = {(text) => setPassword(text)} value={ password }/>
                <Nl />
                <Nl />
            </View>
            <View marginTop='10%' marginLeft='30%' marginRight='30%'>
                { loading ? <ActivityIndicator size = "large" color = "#00e480"/>
                	: <>
                	<Button title='Esegui il login' style={styles.buttonSetting} color='#00e480'/>
            	</>}
            </View>
            <View marginTop='20%'>
                <Text style={styles.subtextSetting}>Non sei ancora iscritto? </Text>
                <View>
                    <Pressable style={styles.buttonSetting} onPress={() => navigation.navigate('SignUp')}>
                      <Text style={styles.linkSetting}>{"Crea un account"}</Text>
                    </Pressable>
                </View>
            </View>
                <Nl />
                <Nl />
                <Nl />
    </View>
    );
};