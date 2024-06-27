import { Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from './Graphic features';


export default function Link({ label, navigation }) {
  return (
    <View>
      <Pressable style={styles.buttonSetting} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkSetting}>{label}</Text>
      </Pressable>
    </View>

    );
};
