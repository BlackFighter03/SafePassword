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
    paddingTop: '30%',
    fontWeight: 'bold',
  },

  headerContainer: {
    marginTop: 'auto',
    paddingTop: '3%',
    backgroundColor: '#00e480',
    headerTintColor: '#ffff',
    paddingBottom: '3%',
  },

  textHeaderSetting: {
    marginLeft: '5%',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
    
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

  pwdInputSetting: {
    position: 'relative',
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

  materialIconsAddStyle: {
    padding: '0.85%',
    position: 'absolute',
    fontSize: 30,
    marginLeft: '85%',
  },

  fontAwesomeEyeSettingStyle: {
    position: 'absolute',
    color: 'grey',
    fontSize: 27.5,
    padding: '1%',
    marginTop: '5%',
    backgroundColor: '#ffff',
    marginLeft: '85%',
  },

});

const option=StyleSheet.create({
  navigationHeaderLogin: {
    headerShown: false,
  },

  navigationHeader: {
    headerStyle: {backgroundColor: '#00e480'},
    headerTintColor: '#ffff',
  },

  buttonAdd: {
    fontSize: 17,
  },

});

export { styles, option }