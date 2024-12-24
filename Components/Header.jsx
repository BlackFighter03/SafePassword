import { View, Text } from "react-native";
import { styles } from "./Graphic features";
import { useState } from "react";


export default Header = (headerTxt) => {
    const [title, setTitle]=useState(headerTxt);
return(
 <View style={styles.headerBackground}>
    <Text style={styles.textHeader}>{title}</Text>
 </View>   
);
};