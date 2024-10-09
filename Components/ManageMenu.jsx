import { View, Alert, Button, Modal } from 'react-native';
import { styles } from './Graphic features';

const ManageMenu = ({menuVisible, setMenuVisible, setTableVisible, setModalVisible, removePassword }) => {

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Button title="Visualizza" onPress={() => {
              console.log("Eccomi");
              setTableVisible(true);
              {/*Alert.alert(item.website, `Nome utente: ${item.username}\nPassword: ${item.password}`); */}
              setMenuVisible(false); 
            }}  color="#00e480"/>
            <Button title="Modifica" onPress={() => {
              setModalVisible(true);
              setMenuVisible(false);
            }}  color="#00e480"/>
            <Button title="Elimina" onPress={() => {
              removePassword();
              setMenuVisible(false);
            }}  color="#00e480"/>
            <Button title="Annulla" onPress={() => {
              setMenuVisible(false);
              }} color="#e74c3c" />
          </View>
        </View>
      </Modal>
    );
};

export default ManageMenu;