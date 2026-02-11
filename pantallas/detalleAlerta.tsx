import React, { useRef, useState } from "react";
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
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const { width } = Dimensions.get("window");

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
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(45);
  const [status, setStatus] = useState<AlertStatus>("PENDIENTE");

  // URL de video de ejemplo
  const videoUrl = require("../assets/stockVideo.mp4");

  const handlePlayPause = async (): Promise<void> => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus): void => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000);
      if (status.durationMillis) {
        setDuration(status.durationMillis / 1000);
        setVideoProgress(status.positionMillis / status.durationMillis);
      }
      setIsPlaying(status.isPlaying);

      // Si el video termina, reiniciar
      if (status.didJustFinish) {
        videoRef.current?.setPositionAsync(0);
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSliderPress = async (event: any) => {
    if (videoRef.current && duration > 0) {
      // Obtenemos la posición X del toque dentro de la barra
      const touchX = event.nativeEvent.locationX;
      // Necesitamos el ancho total de la barra para calcular el %
      // Usaremos el ancho de la pantalla menos los paddings (32px aprox)
      const barWidth = width - 32;

      const newProgress = touchX / barWidth;
      const seekTime = newProgress * duration * 1000; // Convertir a milisegundos

      await videoRef.current.setPositionAsync(seekTime);
    }
  };

  // Función para obtener color según estado
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
            onPress={() => {
              console.log("boton_appBar_volver");
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPJM5Wu2lurkbcY4-gtW8hFhhlRRlSB6AYuRnz1YzypAoNPdBQTLeqjIsPKfaL5LvYXz5dndIs2ueV9uyRM-T4KHbXyeG85fXbB5j25KbEjQ8dLcgmxE391_Y6fnAoF8FTxVhgUUQLcdRP9yfaP2Ovob-A4kIs6XipdnnoK0ftZwLZTgnBdlHzTdrkNNIfgS8qxBHZPDveq54LuiMHN9xrz2VHlBLNzixARwFWTXmRpoH8y4PB4efNzbe6fe56MrOYkB0iacHljgGm",
            }}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerTitle}>DETALLE ALERTA</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player*/}
        {/* Video Player Corregido */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={videoUrl} // <--- CAMBIO AQUÍ: Sin {uri: ...}
            style={styles.videoPlayer}
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            shouldPlay={false}
          />

          {!isPlaying && (
            <View style={styles.videoOverlay}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayPause}
              >
                <MaterialIcons
                  name="play-arrow"
                  size={36}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          )}

          {isPlaying && (
            <TouchableOpacity
              style={styles.videoTouchArea}
              onPress={handlePlayPause}
            />
          )}

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.videoControls}
          >
            {/* Progress Bar Interactiva */}
            <TouchableOpacity
              activeOpacity={1}
              style={styles.progressBarContainer}
              onPress={handleSliderPress} // <--- Detecta el toque
            >
              <View style={styles.progressBarWrapper}>
                {/* Parte llena */}
                <View
                  style={[
                    styles.progressBarFilled,
                    { flex: videoProgress > 0 ? videoProgress : 0.001 },
                  ]}
                />

                {/* El "bolita" o Thumb */}
                <View style={styles.progressThumb} />

                {/* Parte vacía */}
                <View
                  style={[
                    styles.progressBarEmpty,
                    { flex: 1 - (videoProgress > 0 ? videoProgress : 0.001) },
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* Time Labels */}
            <View style={styles.timeLabels}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Alert Header Dinámico */}
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
          {/* Camera Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="videocam" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>CÁMARA ID</Text>
              <Text style={styles.infoValue}>CAM-04-ELEC (Pasillo 4)</Text>
            </View>
          </View>

          {/* Time Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="schedule" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>HORA EXACTA</Text>
              <Text style={styles.infoValue}>14:25:03 — 25 Oct 2023</Text>
            </View>
          </View>

          {/* Location Info */}
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

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },

  // Header Styles
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.slate400,
    letterSpacing: 2,
  },

  // ScrollView Styles
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Video Player Styles
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.black,
    position: "relative",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  videoTouchArea: {
    ...StyleSheet.absoluteFillObject,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  recordingBadge: {
    position: "absolute",
    top: 16,
    left: 16,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
  },
  timeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.white,
  },

  // Alert Header Styles
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
  statusBadge: {
    backgroundColor: `${COLORS.primary}33`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.primary,
    letterSpacing: 1,
  },

  // Info Section Styles
  infoSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
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
  infoContent: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.white,
  },

  // Action Buttons Styles
  actionButtons: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 12,
  },
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
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.white,
  },
});
