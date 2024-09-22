import { Modal, Pressable, View, Text } from "react-native";
import { styles } from "./Graphic features";


const Table = ({title, msg, visible, setVisible}) => {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        >
        <View style={styles.tableBackground}>
            <View style={styles.tableContent}>
            <Text style={styles.textHeader}>{title}</Text>
            <Text style={styles.text}>{msg}</Text>
            <View marginTop='10%'>
                <Pressable onPress={setVisible(false)}>
                <Text style={styles.textReturn}>OK</Text>
                </Pressable>
            </View>
            </View>
        </View>
        </Modal>
    );
}

export default Table;