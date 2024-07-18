Installazione ambiente per la programmazione:

1. Scaricare visual studio code, npm e node-js
2. Scaricare da questo github il contenuto presente in main
3. Inserire all'interno della cartella del codice il pacchetto presente nel link del cloud google allegato
4. Scaricare nel terminale expo con il comando "npm install expo"
5. Far partire la simulazione dell'app, trovandosi nella cartella in cui è presente tutto il progetto, scrivendo "npx expo start". Inizialmentete si potrebbero riscontrare degli errori che chiedono l'istallazione di altre librerie. Installare le librerie richieste dal terminale. 

****************************************************************************************************************************************************************************************************************

Attività da completare nell'app:

1. Modificare la schermata un AuthenticatedScreen.jsx in modo tale da avere una barra dove è presente: a sinistra un menu a tendina, al centro il logo, a destra un pulsante per l'aggiunta delle password. Nel menu a tendina è presente un tasto per le impostazioni dell'account, il logout, informazioni a come funziona l'app (facoltativo), e di nuovo l'aggiunta delle password;
2. Aggiungere della pagina e della funzione per poter inserire nuove password e visualizzarle nel file del punto 1. Inoltre la possibilità di salvare le password il locale (per ora)
3. Scrivere una pagina dedicata alla spiegazione di come funziona l'app (facoltativo)

CONSIGLIO: UTILiZZA GOOGLE AI STUDIO PER SCRIVERE IL CODICE PIU' VELOcemenTE E TI OCCuPI SOLO DI COLLEGARE LE VARIE PARTI TRA LORO PER RENDERLO FUNZIONANTE

****************************************************************************************************************************************************************************************************************

Consigli di Google Ai studio per miglioramenti (da poter inserire nel codice se vuoi):

Hai ragione, passare funzioni direttamente da App.js a LoginScreen può portare a problemi di scope e rendere il codice difficile da gestire. Ecco alcune soluzioni migliori:

1. Utilizzo di Context API:

La Context API di React è un modo efficace per condividere dati e funzioni tra componenti senza dover passare props manualmente attraverso ogni livello della gerarchia.

Crea un Context:

import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    // ... (logica di login con Firebase)
    setUser({ email }); // Imposta l'utente dopo il login
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
content_copy
Use code with caution.
JavaScript

Utilizza il Context in LoginScreen:

import React, { useContext } from 'react';
import { AuthContext } from '../App';

const LoginScreen = () => {
  const { handleLogin } = useContext(AuthContext);

  // ... (resto del codice di LoginScreen)

  const handleSubmit = () => {
    handleLogin(email, password);
  };
};

export default LoginScreen;
content_copy
Use code with caution.
JavaScript

Avvolgi App con AuthProvider:

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { AuthProvider } from './AuthContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* ... */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
content_copy
Use code with caution.
JavaScript

2. Utilizzo di un servizio di gestione dello stato (Redux, Zustand):

Librerie come Redux o Zustand offrono un modo strutturato per gestire lo stato globale dell'applicazione, inclusi dati e funzioni.

Crea un reducer per l'autenticazione:

const initialState = {
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default authReducer;
content_copy
Use code with caution.
JavaScript

Collega il reducer al tuo store:

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import authReducer from './authReducer';

const store = createStore(authReducer);

const App = () => {
  return (
    <Provider store={store}>
      {/* ... resto dell'app */}
    </Provider>
  );
};
content_copy
Use code with caution.
JavaScript

Utilizza il dispatch per chiamare le funzioni di autenticazione:

import { useDispatch } from 'react-redux';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch({ type: 'LOGIN', payload: { email } });
  };
};
content_copy
Use code with caution.
JavaScript

3. Passaggio di funzioni tramite props (per componenti nidificati):

Se LoginScreen è un componente figlio diretto di un componente che gestisce l'autenticazione, puoi passare la funzione handleLogin come prop.

Scegli la soluzione che meglio si adatta alla complessità della tua applicazione. Per applicazioni più grandi e complesse, Context API o Redux/Zustand sono generalmente preferibili.
