import { Text, TextInput, View, Button } from 'react-native';
import { styles } from '../Components/Graphic features';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Link from '../Components/Link';
import Nl from '../Components/Nl';

export default SignUp = () => {
    return (
        <View style={styles.container}>
            <View marginTop='15%'>
                <Text style={styles.textSetting}>Inserisci indirizzo email </Text>
                <Nl />
                <TextInput style={styles.textInputSetting} placeholder='example@email.com'></TextInput>
                <Nl />
                <Text style={styles.textSetting}>Inserisci password </Text>
                <Nl />
                <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Password'></TextInput>
                <Nl />
                <Text style={styles.textSetting}>Ripeti password </Text>
                <Nl />
                <TextInput style={styles.textInputSetting} secureTextEntry={true} placeholder='Conferma password'></TextInput>
                <Nl />
                <Nl />
            </View>
            <View marginTop='10%' marginLeft='30%' marginRight='30%'>
                <Button title='Iscriviti' style={styles.buttonSetting} color='#00e480'/>
            </View>
    </View>
    );
};