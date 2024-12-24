import { View, Text } from "react-native";
import { styles } from "./Graphic features";
import { useState } from "react";


export default Header = ({headerTxt}) => {
return(
    <View style={styles.headerBackground}>
    <TouchableOpacity onPress={handleSignInPage} style={styles.iconAreaHeaderLeft}>
      <Ionicons name="return-up-back-outline" style={styles.iconHeaderLeft} onPress={handleSignInPage} />
    </TouchableOpacity>
    <Text style={styles.textHeader}>{headerTxt}</Text>
  </View>
);
};