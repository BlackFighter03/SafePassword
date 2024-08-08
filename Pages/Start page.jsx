import { View } from 'react-native';
import { styles } from '../Components/Graphic features';
import AuthenticationForm from './Login page/AuthenticationForm';
import AuthenticatedScreen from './AuthenticatedScreen';

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
 * @returns Pagina per eseguire l'accesso o la pagina in cui si è già eseguito l'accesso
 */
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
  handleAuthentication
}) => {
  return (
    <View style={styles.container}>
      {user ? (
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