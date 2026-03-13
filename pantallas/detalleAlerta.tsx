import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import VideoPlayer from "../widgets/video";

const COLORS = {
  backgroundLight: "#f6f7f8",
  backgroundDark: "#111921",
  cardDark: "#1a242e",
  primary: "#197fe6",
  guardiaTeal: "#22d3ee",
  danger: "#ef4444",
  dangerHover: "#dc2626",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  textMuted: "#93adc8",
  white: "#ffffff",
  black: "#000000",
};

type AlertStatus = "PENDIENTE" | "REPORTADO" | "DESCARTADO";

export default function AlertDetail() {
  const [status, setStatus] = useState<AlertStatus>("PENDIENTE");

  const getStatusColor = () => {
    switch (status) {
      case "REPORTADO":
        return COLORS.danger;
      case "DESCARTADO":
        return COLORS.slate500;
      default:
        return COLORS.primary;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => console.log("boton_appBar_volver")}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>DETALLE ALERTA</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <VideoPlayer url={require("../assets/stockVideo.mp4")} />

        {/* Alert Header */}
        <View style={styles.alertHeader}>
          <Text style={styles.alertTitle}>Hurto Detectado</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor()}33` },
            ]}
          >
            <Text style={[styles.statusBadgeText, { color: getStatusColor() }]}>
              {status}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="videocam" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>CÁMARA ID</Text>
              <Text style={styles.infoValue}>CAM-04-ELEC (Pasillo 4)</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="schedule" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>HORA EXACTA</Text>
              <Text style={styles.infoValue}>14:25:03 — 25 Oct 2023</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons
                name="storefront"
                size={24}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>UBICACIÓN</Text>
              <Text style={styles.infoValue}>Sucursal Centro - Bogotá</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {status === "PENDIENTE" ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                setStatus("REPORTADO");
                console.log("boton_confirmar_robo");
              }}
            >
              <MaterialIcons name="report" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>Confirmar robo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setStatus("DESCARTADO");
                console.log("boton_falsa_alarma");
              }}
            >
              <MaterialIcons name="cancel" size={24} color={COLORS.white} />
              <Text style={styles.buttonText}>Falsa alarma</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.cancelButton,
                { backgroundColor: COLORS.slate700 },
              ]}
              onPress={() => {
                setStatus("PENDIENTE");
                console.log("boton_revertir_estado");
              }}
            >
              <Text style={styles.buttonText}>Revertir Estado</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate800,
    backgroundColor: COLORS.backgroundDark,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.slate400,
    letterSpacing: 2,
  },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.black,
    position: "relative",
  },
  videoPlayer: { width: "100%", height: "100%" },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoTouchArea: { ...StyleSheet.absoluteFillObject },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  recordingBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#dc2626",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  recordingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  recordingText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: 1.5,
  },
  videoControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressBarContainer: {
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  progressBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 4,
  },
  progressBarFilled: {
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginHorizontal: -6,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  progressBarEmpty: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
  },
  timeLabels: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { fontSize: 12, fontWeight: "500", color: COLORS.white },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  alertTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: "bold", letterSpacing: 1 },
  infoSection: { paddingHorizontal: 16, paddingTop: 16, gap: 12 },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: COLORS.cardDark,
    borderWidth: 1,
    borderColor: `${COLORS.slate800}80`,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 72,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: `${COLORS.primary}1a`,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: { flex: 1, gap: 2 },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  infoValue: { fontSize: 16, fontWeight: "600", color: COLORS.white },
  actionButtons: { paddingHorizontal: 16, paddingTop: 24, gap: 12 },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.danger,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: COLORS.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: { fontSize: 16, fontWeight: "bold", color: COLORS.white },
});
