import { Alert } from "react-native";
const showAlertMsg = (Title: string, Content: string) => {
    Alert.alert(Title, Content, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
}
    
export { showAlertMsg }


