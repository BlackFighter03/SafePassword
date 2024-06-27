//Da usare per mostrare all'utente le password salvate
//import { NavigationContainer } from '@react-navigation/native';
//import { option} from './Components/Graphic features';
//import Stack from './Components/Stack';
//import Login from './Pages/Login page';

import { useEffect, useState } from 'react';
import { View } from 'react-native';
import AuthenticationForm from './Components/Login settings/AuthenticationForm';
import AuthenticatedScreen from './Components/Login settings/AuthenticatedScreen';
import { auth, createUser, signInUser, onAuthStateChange, signOutUser } from './Components/Firebase';
import { styles } from './Components/Graphic features';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        await signOutUser(auth);
        console.log('User logged out successfully!');
      } else {
        if (isLogin) {
          await signInUser(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          if (password !== confirmPassword) {
            alert('Le password non sono uguali!');
            return;
        }
          await createUser(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {user? (
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
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
};

export default App;