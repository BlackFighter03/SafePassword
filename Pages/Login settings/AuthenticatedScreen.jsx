import { View, Text, Button } from 'react-native';
import { styles } from '../../Components/Graphic features';

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.container} marginTop='30%'>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.textSetting}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};

export default AuthenticatedScreen;