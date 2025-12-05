import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./pages/HomeScreen";

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;
