import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (SCREEN_WIDTH - 32 - CARD_GAP) / 2;
const CARD_HEIGHT = CARD_WIDTH * (9 / 16);

const COLORS = {
  primary: "#197fe6",
  backgroundDark: "#111921",
  cardDark: "#1a2632",
  white: "#ffffff",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate400: "#94a3b8",
  green500: "#22c55e",
  red600: "#dc2626",
};

// ─── Animated pulsing dot ────────────────────────────────────────────────────
const LiveDot: React.FC<{ color?: string; size?: number }> = ({
  color = COLORS.white,
  size = 6,
}) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
      }}
    />
  );
};

// ─── Camera card ─────────────────────────────────────────────────────────────
interface CameraCardProps {
  name: string;
  sub: string;
  imageUri: string;
  offline?: boolean;
}

const CameraCard: React.FC<CameraCardProps> = ({
  name,
  sub,
  imageUri,
  offline = false,
}) => (
  <View style={styles.cameraCard}>
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.cameraImage}
      imageStyle={[styles.cameraImageStyle, offline && styles.offlineImage]}
    >
      {/* Gradient overlay (simulated with a semi-transparent View) */}
      {!offline && <View style={styles.gradientOverlay} />}

      {offline ? (
        <View style={styles.offlineOverlay}>
          {/* Icon placeholder — replace with <MaterialIcons name="videocam-off" size={24} color="#94a3b8" /> */}
          <Text style={styles.offlineIcon}>📵</Text>
          <Text style={styles.offlineLabel}>DESCONECTADA</Text>
        </View>
      ) : (
        <View style={styles.liveBadge}>
          <LiveDot size={6} color={COLORS.white} />
          <Text style={styles.liveBadgeText}>LIVE</Text>
        </View>
      )}

      <View style={styles.cameraInfo}>
        <Text style={styles.cameraName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.cameraSub}>{sub}</Text>
      </View>
    </ImageBackground>
  </View>
);

// ─── Nav item ─────────────────────────────────────────────────────────────────
interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false }) => (
  <TouchableOpacity style={styles.navItem} onPress={() => console.log(label)}>
    <Text style={[styles.navIcon, active && styles.navIconActive]}>{icon}</Text>
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Camera data ──────────────────────────────────────────────────────────────
const cameras: CameraCardProps[] = [
  {
    name: "Entrada Principal",
    sub: "Piso 1 • 60 FPS",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIfUQpQcggVfFzOJY2Yjx5kgA1reyKKKMRHPqRulWdRSTvWDvcLjvnHBzxhRobuifvGYrtUQDZXwQHxj2C2IDGgps2LyWX5-aqpqNaAzrASgkTwXAjCl0mQ06kYTQ6YsI2T1OGiGlqGWsLeAG3Q7l9_80werwSh7FjBITffvR8_IlL922TwzST7UMt1VKlwYBHfCfNJoPak5sqUUBOq-8bUiiSKhP_Q0ldC6wpL_3tgdvoZENu_VwtncUwQpJj_WxYyEjTQMCZY4lq",
  },
  {
    name: "Caja Registradora 1",
    sub: "Zona A • 30 FPS",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu_f75MEi-WBXl7VqE2gXO5l7TeBBU3ed9kpHoDpuRbEPe3XSRjoBfAUMGaWzczR6WcGm9K3p1azukqTdlObxlQ-JENNA4gi2QRfkj3rpY1lYSM7h1YLsOIWjlUBeeswqoe_w7lwtXv58IxNao1td1OzIh1nQhOgeEkCuGEmck1B5vGo0-WtduyNilwHRk0s-5A0ctMQruQ7MRvg9fS-Pff4r5t6UZ_9AsrLgANP6wFHa-47NWwdEfojjjxCs94HrON4gKC8XQAtNV",
  },
  {
    name: "Pasillo A - Lácteos",
    sub: "Piso 1 • 60 FPS",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVCkCLx0bqN_J6fBDi_H7mSTBoy8FwbPgBJeQR1MIN-VUnEWIh_TT9OQzFZkBwUARrhf8rdC6xdWP7Wx4d7Ad9Lu_NmiQp7awa1Q9XhIj9ZIjY3NSW1L50WTB3RhvXE5-Oah5grUesVqk96876zvaqSxkERpZrZvbgZ8RN5rEbPOhZoYnD-6EmBDUK31mO1E9ApG0euhbIqlgQuJd5_ti-weaM94LePWMiMxQAvWq1Bv8U1SoXaUgJtE_T0LnPbsbJrOvTxliMp53j",
  },
  {
    name: "Almacén Trasero",
    sub: "Zona C • 30 FPS",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhjEluzWNnSRzCFv9SOZ2K26nV2aCDXz6nEtMMsRmBjV-I8F0JyKN2x9HG_uICv3U69zN4CadDXWsS0B5NSfGeUM0OsHMK5rbk4dgAQP7J0A2hHrK1wJGZcvNIU_OGIDvLAuPoQ3XzhWn4Uj9MjwWrR-Fkb1tcI4VCxhjxf9k2iuPEjnC3KYp6J1z7m61ryVXDA1VjtPghhX8IQWdVqYHNIj9Bag-0FNUTh7j_e28g4cjqI3MYiXC8ewrPPmxYwBaZtuk1TKIPe53s",
  },
  {
    name: "Pasillo B - Textil",
    sub: "Sin señal",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBwUg8tT4zCofypt1XVVjGZfhwLrzOCLg4CWPFOTG0kE9S91j2nJW24NSEwpLcvjf0hO60Td7VRgoCBTWoJ5MW-iaHastnEROnyKv0qgvpK_eGqR4TKg063bKOFMIhuumgt-68stvOhOu6s9d82DwgG_RZUEWEtt7bctyPOSceC-ft1_M3YEPnMWleN6tMhp0_BTvk4BXsz1cOG0VcUqxl15e70P1IvuHrcoyFMPgzaWx-E9fAGE2c-qCj7UzZX0rZtQNvrqCw9IQL4",
    offline: true,
  },
  {
    name: "Parking Externo",
    sub: "Exterior • 15 FPS",
    imageUri:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8p--LCBs4zX-quR22N8XtrkZ_obcI0paBjKwICbvrmluzScDBBloZ9gD0LF3UMz3XL97zj6leXP7JFK9pZDeE9-zLKXCW13vCrfkbWBh0cYwEOYLbEXaKq0cfiVKkLg12rRJoRGlpG2zX39ioRNWkEFfHwA6WEaxxzBw24-OQvlGDZCmOQHtPCJQFpWNHzKzO6TG5xedArHwy5AL2vx7jRH_XKMXjlG_Jtry73CIYRFY4hoL5ktiDtcQ4cXrO6WkyAr8RXGHPqVoo",
  },
];

// ─── Main screen ──────────────────────────────────────────────────────────────
const CamerasScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtTar6NYfJ-3g4tHunNBhWMV5oDxCvpGmtrvz2iUvTKOKhHSHs1y5QKbVw6puHHw48rVDJ4ImWomHvEt7lsu1H2YHhvfEQWHQz8baDIECRja0WgIT7NcGuotxSzoeIykLPdbqPVVkRBmgjGt5UQszCbHZb_Xfqvk08GFUMZ4CQO5XOHAd1AM2hVz5s05f8OXICAZPAXXyEAo2HdWe1CltPtnTVTjITlDWehcJr5UUeqNUkCvHFqvTwvyfH-QA7qe6gDfKo-Kyk7qoW",
            }}
            style={styles.logoImage}
          />
          <View style={styles.logoTextStack}>
            <Text style={styles.logoGuard}>Guard</Text>
            <Text style={styles.logoIA}>IA</Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>Cámaras</Text>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => console.log("boton_buscador")}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status card */}
        <View style={styles.statusCardWrapper}>
          <View style={styles.statusCard}>
            <View style={styles.statusCardTop}>
              <Text style={styles.statusCardLabel}>Estado del Sistema</Text>
              <LiveDot size={8} color={COLORS.green500} />
            </View>
            <View style={styles.statusCardBottom}>
              <Text style={styles.statusCount}>12/14</Text>
              <Text style={styles.statusSub}>Cámaras activas</Text>
            </View>
          </View>
        </View>

        {/* Camera grid */}
        <View style={styles.grid}>
          {cameras.map((cam, i) => (
            <CameraCard key={i} {...cam} />
          ))}
        </View>

        {/* Full screen button */}
        <View style={styles.fullscreenButtonWrapper}>
          <TouchableOpacity
            style={styles.fullscreenButton}
            activeOpacity={0.85}
            onPress={() => console.log("boton_pantallaCompletas")}
          >
            {/* Replace with <MaterialIcons name="fullscreen" size={22} color="#fff" /> */}
            <Text style={styles.fullscreenIcon}>⛶</Text>
            <Text style={styles.fullscreenText}>
              Ver todas a pantalla completa
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bottom nav spacing */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="🏠" label="Inicio" />
        <NavItem icon="📹" label="Cámaras" active />
        <NavItem icon="🔔" label="Eventos" />
        <NavItem icon="⚙️" label="Ajustes" />
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(30,41,59,0.5)",
    backgroundColor: COLORS.backgroundDark,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  logoTextStack: {
    flexDirection: "column",
  },
  logoGuard: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
  },
  logoIA: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    lineHeight: 13,
  },
  headerTitle: {
    flex: 1,
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    fontSize: 18,
  },

  // Scroll
  scrollContent: {
    paddingBottom: 16,
  },

  // Status card
  statusCardWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
  },
  statusCard: {
    backgroundColor: COLORS.cardDark,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  statusCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusCardLabel: {
    color: "#94a3b8",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statusCardBottom: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  statusCount: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -1,
  },
  statusSub: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  // Grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: CARD_GAP,
  },

  // Camera card
  cameraCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#1e293b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  cameraImage: {
    flex: 1,
  },
  cameraImageStyle: {
    resizeMode: "cover",
  },
  offlineImage: {
    opacity: 0.35,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  liveBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(220,38,38,0.9)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  offlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  offlineIcon: {
    fontSize: 22,
    opacity: 0.6,
  },
  offlineLabel: {
    color: "#94a3b8",
    fontSize: 9,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  cameraInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  cameraName: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },
  cameraSub: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 9,
    marginTop: 1,
  },

  // Fullscreen button
  fullscreenButtonWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  fullscreenButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 56,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  fullscreenIcon: {
    fontSize: 20,
    color: COLORS.white,
  },
  fullscreenText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  // Bottom nav
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    backgroundColor: "rgba(26,38,50,0.97)",
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  navIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    color: "#93adc8",
    fontSize: 9,
    fontWeight: "500",
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});

export default CamerasScreen;
