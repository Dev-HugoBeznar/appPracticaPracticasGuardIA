import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GuardIALogin from "./pantallas/login";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <GuardIALogin />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
