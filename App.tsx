import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GuardIALogin from "./pantallas/login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GuardIADashboard from "./pantallas/home";
import AlertDetail from "./pantallas/detalleAlerta";
import ClientProfile from "./pantallas/perfil";
import CamerasScreen from "./pantallas/camaraDirecto";

export default function App() {
  return (
    <SafeAreaProvider>
      <CamerasScreen />
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
