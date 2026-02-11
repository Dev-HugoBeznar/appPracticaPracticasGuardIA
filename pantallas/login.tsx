import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

// Definición de colores extraída del Tailwind config
const COLORS = {
  backgroundDark: "#020c17",
  corporateBlue: "#197fe6",
  textMuted: "#93adc8",
  inputBorder: "#344d65",
  inputBg: "rgba(26, 38, 50, 0.5)",
  white: "#ffffff",
};

export default function GuardIALogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />

      {/* Background Blobs */}
      <View style={styles.backgroundBlobTop} />
      <View style={styles.backgroundBlobBottom} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.contentContainer}>
          {/* LOGO SECTION */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircleBackground}>
              <View style={styles.logoWrapper}>
                {/* Escudo */}
                <MaterialIcons
                  name="security"
                  size={80}
                  color={COLORS.corporateBlue}
                  style={{ opacity: 0.9 }}
                />

                {/* Ojo dentro del escudo */}
                <View style={styles.logoEyeOverlay}>
                  <MaterialIcons
                    name="visibility"
                    size={32}
                    color={COLORS.corporateBlue}
                  />
                </View>

                {/* Puntos decorativos */}
                <View style={styles.dotsContainer}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View
                    style={[styles.dot, { transform: [{ translateX: 4 }] }]}
                  />
                </View>
              </View>

              {/* Texto GuardIA */}
              <View style={styles.logoTextContainer}>
                <Text style={styles.logoTextGuard}>Guard</Text>
                <Text style={styles.logoTextIA}>IA</Text>
              </View>
            </View>

            <Text style={styles.title}>Security Management</Text>
            <Text style={styles.subtitle}>
              Acceda a su panel de monitoreo retail
            </Text>
          </View>

          {/* FORM SECTION */}
          <View style={styles.formSection}>
            {/* Input Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="mail-outline"
                  size={20}
                  color={COLORS.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="correo@correo.com"
                  placeholderTextColor="rgba(147, 173, 200, 0.4)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Input Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>CONTRASEÑA</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="lock-outline"
                  size={20}
                  color={COLORS.textMuted}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(147, 173, 200, 0.4)"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {
                console.log("boton_acceder");
              }}
            >
              <Text style={styles.buttonText}>Acceder</Text>
              <MaterialIcons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.verifiedContainer}>
              <MaterialIcons
                name="verified-user"
                size={14}
                color={COLORS.textMuted}
              />
              <Text style={styles.verifiedText}>CONEXIÓN SEGURA GUARDIA</Text>
            </View>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 60, // Espacio extra superior para evitar cámara/notch
    paddingBottom: 20,
  },
  // Background Effects
  backgroundBlobTop: {
    position: "absolute",
    top: -height * 0.1,
    right: -width * 0.1,
    width: width * 0.6,
    height: height * 0.5,
    backgroundColor: COLORS.corporateBlue,
    opacity: 0.05,
    borderRadius: 1000,
    transform: [{ scale: 1.5 }],
  },
  backgroundBlobBottom: {
    position: "absolute",
    bottom: -height * 0.05,
    left: -width * 0.05,
    width: width * 0.5,
    height: height * 0.4,
    backgroundColor: COLORS.corporateBlue,
    opacity: 0.05,
    borderRadius: 1000,
    transform: [{ scale: 1.5 }],
  },

  // Logo Styles
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoCircleBackground: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 8,
  },
  logoEyeOverlay: {
    position: "absolute",
    top: 34,
  },
  dotsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.corporateBlue,
    borderRadius: 2,
    marginRight: 2,
  },
  logoTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  logoTextGuard: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.corporateBlue,
    letterSpacing: -1,
  },
  logoTextIA: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.corporateBlue,
    marginTop: -8,
    letterSpacing: -2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.white,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    marginTop: 8,
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },

  // Form Styles
  formSection: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    opacity: 0.5,
    letterSpacing: 1.2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    height: "100%",
  },
  eyeIcon: {
    padding: 8,
  },

  // Button Styles
  button: {
    backgroundColor: COLORS.corporateBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: COLORS.corporateBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },

  // Footer Styles
  footer: {
    marginTop: "auto",
    alignItems: "center",
    paddingTop: 40,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.6,
    gap: 8,
  },
  verifiedText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 2,
  },
  homeIndicator: {
    marginTop: 32,
    width: 128,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 100,
  },
});
