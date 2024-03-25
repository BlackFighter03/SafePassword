import { NavigationContainer } from '@react-navigation/native';
import { styles, option } from './Components/Graphic features';
import Link from './Components/Link';
import Nl from './Components/Nl';
import Stack from './Components/Stack';
import SignUp from './Pages/SignUp page';
import Login from './Pages/Login page';

export default function App() {
  return (
    <NavigationContainer style={{ backgroundColor: '#202134'  }}>
        <Stack.Navigator screenOptions={{ presentation: 'transparentModal' }}>
            <Stack.Screen name="Login" component={Login} options={option.navigationHeaderLogin} />
            <Stack.Screen name="SignUp" component={SignUp} options={option.navigationHeader}/>
        </Stack.Navigator>
    </NavigationContainer>
    );
};