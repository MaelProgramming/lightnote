import React from 'react'
import { View, Text } from 'react-native'
import { footerStyle } from '../styles/styles'

interface FooterProps {
    copyright: string,
}

const copyrightText: string = "2025, By Mael Developpement, Light Note, All rights reserved"

const Footer: React.FC<FooterProps> = ({copyright=copyrightText}) => {
    return (
        <View style={footerStyle.container}>
            <Text style={footerStyle.text}>{copyright}</Text>        
        </View>
     )
}

export default Footer
