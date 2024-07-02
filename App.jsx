import { useEffect, useState } from 'react';
import { View } from 'react-native';
import StartPage from './Pages/Start page';
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
      alert("Email e/o password non sono corrette");
    }
  };

  return (
   <View style={styles.container}>
        <StartPage
          user={user}
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
    </View>
  );
};

export default App;