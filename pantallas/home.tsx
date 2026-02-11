import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const COLORS = {
  backgroundLight: "#f6f7f8",
  backgroundDark: "#111921",
  primary: "#197fe6",
  brandTeal: "#26a69a",
  success: "#10b981",
  warning: "#ef4444",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate300: "#cbd5e1",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  white: "#ffffff",
  black: "#000000",
};

// Componente para estado de éxito
const StatusBannerSuccess = () => (
  <View style={styles.statusBanner}>
    <View style={styles.statusIcon}>
      <MaterialIcons name="check-circle" size={28} color={COLORS.white} />
    </View>
    <View style={styles.statusTextContainer}>
      <Text style={styles.statusTitle}>Todo bajo control</Text>
      <Text style={styles.statusSubtitle}>Sistema operando normalmente</Text>
    </View>
  </View>
);

// Componente para estado de alerta
const StatusBannerAlert = () => (
  <View style={styles.statusBannerAlert}>
    <View style={styles.statusIconAlert}>
      <MaterialIcons name="warning" size={28} color={COLORS.white} />
    </View>
    <View style={styles.statusTextContainer}>
      <Text style={styles.statusTitleAlert}>Problema detectado</Text>
      <Text style={styles.statusSubtitleAlert}>
        Requiere atención inmediata
      </Text>
    </View>
  </View>
);

export default function GuardIADashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [hasAlert, setHasAlert] = useState(false); // Cambia a true para ver el estado de alerta

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />

      {/* Header / Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navbarContent}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkAhi5jZlozzuDCfGxu0kHHsRe7qtdhUHHRQ6uJhTTmMvyDn-wILOYMJFKw98-8yR-C9jnZYpyW4fpGmc6LJo0TAbRazlvSD4nVcaYs4s9c148gSQ_jN5LIlKDLWqDfgM8KJItt86AGlM4v7mKSf3HoZDpufhk5H1Fca2Xn3uQZiXTCDcil5nfLPz93-gPT65k6LY0Y5auo0VJVAjL6G3zqpMUr7a92Z7K25hqjKooE5b28A2as7qj6rIrBxmSmpxl1K6SQLYVYTMO",
              }}
              style={styles.logo}
            />
            <View style={styles.logoTextContainer}>
              <Text style={styles.logoText}>GuardIA</Text>
              <Text style={styles.logoSubtext}>SECURITY</Text>
            </View>
          </View>

          {/* Right Actions */}
          <View style={styles.navActions}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => {
                console.log("boton_notificaciones");
              }}
            >
              <MaterialIcons
                name="notifications"
                size={24}
                color={COLORS.slate300}
              />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => {
                console.log("boton_perfil");
              }}
            >
              <MaterialIcons
                name="account-circle"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Banner - Cambia según el estado */}
        {hasAlert ? <StatusBannerAlert /> : <StatusBannerSuccess />}

        {/* este boton esta solo para ver los dos estados deveria quitarse despues */}
        <TouchableOpacity
          style={styles.demoButton}
          onPress={() => setHasAlert(!hasAlert)}
        >
          <Text style={styles.demoButtonText}>cambiar_estado</Text>
        </TouchableOpacity>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Alertas Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <MaterialIcons
                name="emergency"
                size={18}
                color={COLORS.primary}
              />
              <Text style={styles.statLabel}>ALERTAS HOY</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <View style={styles.statChange}>
              <Text style={styles.statChangeValue}>+2%</Text>
              <Text style={styles.statChangeLabel}>vs ayer</Text>
            </View>
          </View>

          {/* Cámaras Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <MaterialIcons name="videocam" size={18} color={COLORS.success} />
              <Text style={styles.statLabel}>CÁMARAS</Text>
            </View>
            <Text style={styles.statValue}>22/24</Text>
            <View style={styles.statChange}>
              <Text style={[styles.statChangeValue, { color: COLORS.success }]}>
                Activas
              </Text>
            </View>
          </View>
        </View>

        {/* Latest Event Section */}
        <View style={styles.eventSection}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>Último evento</Text>
            <Text style={styles.eventTime}>Hace 4 min</Text>
          </View>

          <View style={styles.eventCard}>
            {/* Video Preview */}
            <View style={styles.videoContainer}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBck1PlFSoYwew68ntPhSoPNxWnfxQjNqj-M3EQk9wZf5kKLEJMimBZdl-XpeY2dgwL2CBMOv6waY7BjeFw7qV3safj6_q3rvvNcz7DpHiuUCLaXG_7tTZjfpAEY24m6IMCN3WUsMxygsqw78_cyvr6LebtPzYYIth-nzeowzSpCV4Hp602Vq72sqD5ECoreMYnKUT4X_PRfQYSFdcOCE4sMg1aVmDCQfGniCoYwD7gr1-fOdoIuvAJLLaJLdmECywdVpgMEOVnFRLV",
                }}
                style={styles.videoImage}
                resizeMode="cover"
              />
              <View style={styles.videoOverlay}>
                <TouchableOpacity
                  style={styles.playButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    console.log("boton_reproducir_video");
                  }}
                >
                  <MaterialIcons
                    name="play-arrow"
                    size={32}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              </View>

              {/* Recording Badge */}
              <View style={styles.recordingBadge}>
                <View style={styles.recordingDot} />
                <Text style={styles.recordingText}>REC 14:32:05</Text>
              </View>

              {/* Camera Label */}
              <View style={styles.cameraLabel}>
                <Text style={styles.cameraLabelText}>
                  Cam 04 - Acceso Principal
                </Text>
              </View>
            </View>

            {/* Event Info */}
            <View style={styles.eventInfo}>
              <View style={styles.eventInfoText}>
                <Text style={styles.eventInfoTitle}>Movimiento detectado</Text>
                <Text style={styles.eventInfoSubtitle}>
                  Zona de descarga • Retail Store ID: 442
                </Text>
              </View>
              <TouchableOpacity
                style={styles.eventMenuButton}
                onPress={() => {
                  console.log("boton_opciones_ultimo_evento");
                }}
              >
                <MaterialIcons
                  name="more-vert"
                  size={24}
                  color={COLORS.slate600}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.9}
            onPress={() => {
              console.log("boton_ver_alertas");
            }}
          >
            <MaterialIcons
              name="notification-important"
              size={32}
              color={COLORS.white}
            />
            <Text style={styles.actionButtonText}>Ver alertas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.9}
            onPress={() => {
              console.log("boton_ver_camaras");
            }}
          >
            <MaterialIcons name="visibility" size={32} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Ver cámaras</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            setActiveTab("home");
            console.log("boton_tabBar_home");
          }}
        >
          <MaterialIcons
            name="home"
            size={24}
            color={activeTab === "home" ? COLORS.primary : COLORS.slate500}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "home" && styles.tabLabelActive,
            ]}
          >
            Inicio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            setActiveTab("cameras");
            console.log("boton_tabBar_camaras");
          }}
        >
          <MaterialIcons
            name="videocam"
            size={24}
            color={activeTab === "cameras" ? COLORS.primary : COLORS.slate500}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "cameras" && styles.tabLabelActive,
            ]}
          >
            Cámaras
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            setActiveTab("reports");
            console.log("boton_tabBar_reportes");
          }}
        >
          <MaterialIcons
            name="analytics"
            size={24}
            color={activeTab === "reports" ? COLORS.primary : COLORS.slate500}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "reports" && styles.tabLabelActive,
            ]}
          >
            Reportes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            setActiveTab("settings");
            console.log("boton_tabBar_ajustes");
          }}
        >
          <MaterialIcons
            name="settings"
            size={24}
            color={activeTab === "settings" ? COLORS.primary : COLORS.slate500}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "settings" && styles.tabLabelActive,
            ]}
          >
            Ajustes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },

  // Navbar Styles
  navbar: {
    backgroundColor: `${COLORS.backgroundDark}cc`,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate800,
  },
  navbarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 448,
    alignSelf: "center",
    width: "100%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  logoTextContainer: {
    flexDirection: "column",
    gap: -2,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: -0.5,
    lineHeight: 20,
  },
  logoSubtext: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.brandTeal,
    letterSpacing: 2,
    lineHeight: 12,
  },
  navActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.slate800,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
    borderWidth: 2,
    borderColor: COLORS.backgroundDark,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}33`,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: `${COLORS.primary}4d`,
  },

  // ScrollView Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    maxWidth: 448,
    alignSelf: "center",
    width: "100%",
  },

  // Status Banner Styles
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: `${COLORS.success}1a`,
    borderWidth: 1,
    borderColor: `${COLORS.success}33`,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.success,
    lineHeight: 28,
  },
  statusSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: `${COLORS.success}cc`,
    marginTop: 2,
  },

  // Status Banner Alert Styles (Problema detectado)
  statusBannerAlert: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: `${COLORS.warning}1a`,
    borderWidth: 1,
    borderColor: `${COLORS.warning}33`,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statusIconAlert: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.warning,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitleAlert: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.warning,
    lineHeight: 28,
  },
  statusSubtitleAlert: {
    fontSize: 14,
    fontWeight: "500",
    color: `${COLORS.warning}cc`,
    marginTop: 2,
  },

  // Demo Button (temporal para testing)
  demoButton: {
    backgroundColor: COLORS.slate700,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.slate600,
  },
  demoButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },

  // Stats Cards Styles
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.slate800,
    borderWidth: 1,
    borderColor: COLORS.slate700,
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.slate400,
    letterSpacing: 1.5,
  },
  statValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.white,
  },
  statChange: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statChangeValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.warning,
  },
  statChangeLabel: {
    fontSize: 10,
    color: COLORS.slate400,
  },

  // Event Section Styles
  eventSection: {
    marginBottom: 24,
  },
  eventHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    letterSpacing: -0.3,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.slate400,
  },
  eventCard: {
    backgroundColor: COLORS.slate800,
    borderWidth: 1,
    borderColor: COLORS.slate700,
    borderRadius: 12,
    overflow: "hidden",
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.slate900,
    position: "relative",
  },
  videoImage: {
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${COLORS.primary}e6`,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordingBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  recordingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.warning,
  },
  recordingText: {
    fontSize: 10,
    fontWeight: "500",
    color: COLORS.white,
    fontFamily: "monospace",
  },
  cameraLabel: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cameraLabelText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.white,
    textTransform: "uppercase",
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  eventInfoText: {
    flex: 1,
  },
  eventInfoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 2,
  },
  eventInfoSubtitle: {
    fontSize: 12,
    color: COLORS.slate400,
  },
  eventMenuButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.slate700,
    alignItems: "center",
    justifyContent: "center",
  },

  // Action Buttons Styles
  actionButtons: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    height: 112,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
  },

  // Bottom Tab Bar Styles
  bottomTabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: `${COLORS.backgroundDark}e6`,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate800,
    paddingBottom: 34,
    paddingTop: 8,
    paddingHorizontal: 16,
    maxWidth: 448,
    alignSelf: "center",
    width: "100%",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.slate500,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: COLORS.primary,
  },
});
