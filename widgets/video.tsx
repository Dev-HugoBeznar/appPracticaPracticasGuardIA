import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";

const COLORS = {
  primary: "#197fe6",
  white: "#ffffff",
  black: "#000000",
};

interface VideoPlayerProps {
  url: string | number;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [barWidth, setBarWidth] = useState(0);
  const isSeeking = useRef(false);

  const handlePlayPause = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded || isSeeking.current) return;
    const dur = status.durationMillis ?? 0;
    const pos = status.positionMillis ?? 0;
    setVideoProgress(dur > 0 ? pos / dur : 0);
    setCurrentTime(pos / 1000);
    setDuration(dur / 1000);
    setIsPlaying(status.isPlaying);
  };

  const handleSliderPress = async (event: any) => {
    if (!videoRef.current || barWidth <= 0 || duration <= 0) return;

    isSeeking.current = true;
    const touchX = event.nativeEvent.locationX;
    const newProgress = Math.max(0, Math.min(touchX / barWidth, 1));
    const seekMs = newProgress * duration * 1000;

    setVideoProgress(newProgress);
    setCurrentTime(newProgress * duration);

    try {
      await videoRef.current.setPositionAsync(seekMs);
    } catch (e) {
      console.log("Error seeking", e);
    } finally {
      setTimeout(() => {
        isSeeking.current = false;
      }, 300);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const source = typeof url === "string" ? { uri: url } : url;

  return (
    <View style={styles.videoContainer}>
      <Video
        ref={videoRef}
        source={source}
        style={styles.videoPlayer}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        shouldPlay={false}
      />

      {/* Badge REC */}
      <View style={styles.recordingBadge}>
        <View style={styles.recordingDot} />
        <Text style={styles.recordingText}>REC</Text>
      </View>

      {/* Botón play central */}
      {!isPlaying && (
        <View style={styles.videoOverlay}>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <MaterialIcons name="play-arrow" size={36} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Tap para pausar */}
      {isPlaying && (
        <TouchableOpacity
          style={styles.videoTouchArea}
          onPress={handlePlayPause}
        />
      )}

      {/* Controles inferiores */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.videoControls}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.progressBarContainer}
          onPress={handleSliderPress}
        >
          <View
            style={styles.progressBarWrapper}
            pointerEvents="none"
            onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
          >
            <View
              style={[
                styles.progressBarFilled,
                { width: barWidth > 0 ? videoProgress * barWidth : 0 },
              ]}
            />
            <View style={styles.progressThumb} />
            <View
              style={[
                styles.progressBarEmpty,
                {
                  width:
                    barWidth > 0 ? (1 - videoProgress) * barWidth : barWidth,
                },
              ]}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.timeLabels}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
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
    backgroundColor: "#fff",
  },
  recordingText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
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
    elevation: 3,
  },
  progressBarEmpty: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
  },
  timeLabels: { flexDirection: "row", justifyContent: "space-between" },
  timeText: { fontSize: 12, fontWeight: "500", color: "#fff" },
});
