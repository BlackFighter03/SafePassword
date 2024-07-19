import { View } from 'react-native';
import { styles } from '../Components/Graphic features';
import AuthenticationForm from './Login settings/AuthenticationForm';
import AuthenticatedScreen from './AuthenticatedScreen';

const StartPage = ({
    user,
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
    return (
        <View style={styles.container}>
           {user? (
             <AuthenticatedScreen handleAuthentication={handleAuthentication} />
           ) : (
             <AuthenticationForm
               isLogin={isLogin}
               setIsLogin={setIsLogin}
               email={email}
               setEmail={setEmail}
               password={password}
               setPassword={setPassword}
               confirmPassword={confirmPassword}
               setConfirmPassword={setConfirmPassword}
               handleAuthentication={handleAuthentication}
             />
           )}
         </View>
       );
}

export default StartPage;