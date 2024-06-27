import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202134',
  },

  titleSetting: {
    textAlign: 'center',
    fontSize: 40,
    color: '#ffff',
    paddingTop: '35%',
    fontWeight: 'bold',
  },

  textSetting: {
    marginLeft: '5%',
    fontSize: 17,
    color: '#ffff',
    
  },

  textInputSetting: {
    fontSize: 17,
    padding: '1%',
    marginTop: '5%',
    backgroundColor: '#ffff',
    marginLeft: '5%',
    marginRight: '5%',

  },

  buttonSetting: {
    itemAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    fontSize: 17,
  },

  subtextSetting: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffff',
  },

  linkSetting: {
    textAlign: 'center',
    fontSize: 14,
    color: '#ffff',
    textDecorationLine: 'underline',
  },

});

const option=StyleSheet.create({
  navigationHeaderLogin: {
    headerShown: false,
  },

  navigationHeader: {
    title: 'Sign Up',
    headerStyle: {backgroundColor: '#00e480'},
    headerTintColor: '#ffff',
  },

});

export { styles, option }