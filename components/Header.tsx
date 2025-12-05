import { View, Text, Button, Alert } from "react-native";
import { showAlertMsg } from "../utils/showAlert";
import { Gap } from "../utils/Gap";
import React from "react";
import { headerStyle } from "../styles/styles";

interface HeaderProps {
    title: string,
}

const Header: React.FC<HeaderProps> = ({title = "Light Note"}) => {
    
    return(
        <View style={headerStyle.container}>
            <Text style={headerStyle.text}>{title}</Text>
            <Gap size={60}></Gap>
            <Button title="About this app" onPress={() => {showAlertMsg("About this app", "This application is made with React Native and Android NDK 26.1")}}></Button>

        </View>
    )
}

export default Header;

