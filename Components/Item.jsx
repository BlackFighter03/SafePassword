import ManageMenu from './ManageMenu';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo'
import { useState } from 'react';
import { styles } from './Graphic features';
import { FontAwesome } from '@expo/vector-icons';
import Table from './Table';


const Item = ({ item, configureOpenMenu, setModalVisible, removePassword }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [pwd, setPwd] = useState('*******');

    const handleOpenMenu = () => {
        configureOpenMenu(item);
        setMenuVisible(true);
    };

    return (
        <View>
            <View>
                <Text style={styles.textWebsite}>Sito: {item.website}</Text>
                <TouchableOpacity style={styles.iconDots} onPress={() => {return handleOpenMenu();}}>
                    <Entypo name="dots-three-vertical" style={styles.iconDots} />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <Text style={styles.textPwd}>Password: {pwd}</Text>
                <TouchableOpacity onPress={() => {
                    if(showPassword)
                        setPwd('*******');
                    else
                        setPwd(item.password);
                    setShowPassword(!showPassword);
                    }}>
                    <FontAwesome
                        style={styles.fontAwesomeEyeItem}
                        name={showPassword ? 'eye' : 'eye-slash'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <ManageMenu
                menuVisible={menuVisible}
                setMenuVisible={setMenuVisible}
                setModalVisible={setModalVisible}
                setTableVisible={setShowInfo}
                removePassword={removePassword}
            />
            <Table
            visible={showInfo}
            setVisible={() => setShowInfo(false)}
            title={"Sito web: "+item.website}
            msg={"Nome utente: "+item.username+"\n"+"Password: "+item.password}
            />
        </View>
    );
};

export default Item;