import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  primary: "#197fe6",
  backgroundDark: "#111921",
  backgroundLight: "#f6f7f8",
  white: "#ffffff",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate100: "#f1f5f9",
  green400: "#4ade80",
  green700: "#15803d",
};

interface SectionRowProps {
  icon: string;
  label: string;
  value: string;
  badge?: { text: string; color: string; bg: string };
}

const SectionRow: React.FC<SectionRowProps> = ({
  icon,
  label,
  value,
  badge,
}) => (
  <View style={styles.row}>
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <View style={styles.rowContent}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
    {badge && (
      <View style={[styles.badge, { backgroundColor: badge.bg }]}>
        <Text style={[styles.badgeText, { color: badge.color }]}>
          {badge.text}
        </Text>
      </View>
    )}
  </View>
);

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
);

const Divider = () => <View style={styles.divider} />;

const ClientProfile: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundDark }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.backgroundDark}
      />
      <SafeAreaView
        style={styles.safeArea}
        edges={["bottom", "left", "right", "top"]}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => console.log("appBar_volver")}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            {/* Logo placeholder */}
            <Text style={styles.logoText}>GuardIA</Text>
            <View style={styles.headerTitleRow}>
              <Text style={styles.headerTitleIcon}>🛡</Text>
              <Text style={styles.headerTitle}>Perfil de Cliente</Text>
            </View>
          </View>
          <View style={styles.backButtonPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar + Company Info */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnMGg6s3V8K79mG7xaIuYaH3ssQj6RFwaSkZhYktr8q3zriUBDTHWDvrNQ1Ov_UQs2L3ENi6sr3u2VIj4y50yh7vHDkg6isKmua07AF5M5cmbgp_a5XEqLA4cpJGF7clxZkQFQ61Y60OM2PTRsNnnnkxRYszsV9NVGp1CZNjrIxoUlz01GFZKFoW2IoLLn-DMjLuvFZev6t21TMFe5kHBk9hpoz8vZtBe-X-KssqO4dekmIolFY1ActUmV9p7qhra_BvEyn_U4W7CB",
                }}
                style={styles.avatar}
              />
            </View>
            <Text style={styles.companyName}>Retail Global Solutions S.L.</Text>
            <Text style={styles.companyCif}>CIF: B87654321</Text>
          </View>

          {/* Change Password Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              activeOpacity={0.85}
              onPress={() => console.log("Boton_cambiarContraseña")}
            >
              <Text style={styles.primaryButtonIcon}>🔑</Text>
              <Text style={styles.primaryButtonText}>Cambiar contraseña</Text>
            </TouchableOpacity>
          </View>

          {/* Datos Fiscales */}
          <SectionHeader title="Datos Fiscales" />
          <View style={styles.card}>
            <SectionRow
              icon="📍"
              label="Dirección Fiscal"
              value="Paseo de la Castellana 250, 28046 Madrid"
            />
            <Divider />
            <SectionRow icon="🌐" label="País" value="España" />
          </View>

          {/* Información de Contacto */}
          <SectionHeader title="Información de Contacto" />
          <View style={styles.card}>
            <SectionRow
              icon="👤"
              label="Persona de Contacto"
              value="Carlos Rodríguez Mendoza"
            />
            <Divider />
            <SectionRow
              icon="✉️"
              label="Email"
              value="c.rodriguez@retailglobal.com"
            />
            <Divider />
            <SectionRow icon="📞" label="Teléfono" value="+34 612 345 678" />
          </View>

          {/* Configuración de Cuenta */}
          <SectionHeader title="Configuración de Cuenta" />
          <View style={styles.card}>
            <SectionRow icon="🪪" label="Rol" value="Cliente (Administrador)" />
            <Divider />
            <SectionRow icon="🌍" label="Idioma" value="Español (ES)" />
          </View>

          {/* Plan y Suscripción */}
          <SectionHeader title="Plan y Suscripción" />
          <View style={styles.card}>
            <SectionRow
              icon="✅"
              label="Plan Actual"
              value="GuardIA Enterprise Plus"
              badge={{ text: "Activo", color: "#15803d", bg: "#dcfce7" }}
            />
            <Divider />
            <SectionRow
              icon="💳"
              label="Método de Pago"
              value="Visa terminada en •••• 4242"
            />
            <Divider />
            <SectionRow
              icon="📅"
              label="Fecha de Alta"
              value="12 de Octubre, 2023"
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>ID de Cliente: GI-99283-MX</Text>
            <Text style={styles.footerText}>GuardIA IA v2.4.0</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

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
    backgroundColor: "rgba(17,25,33,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate800,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: "300",
    lineHeight: 32,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  logoText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 2,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerTitleIcon: {
    fontSize: 14,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  // Scroll
  scrollContent: {
    paddingBottom: 40,
  },

  // Profile card
  profileCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  avatarWrapper: {
    borderRadius: 9999,
    borderWidth: 4,
    borderColor: "rgba(25,127,230,0.25)",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 9999,
  },
  companyName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.3,
    textAlign: "center",
    marginBottom: 4,
  },
  companyCif: {
    color: COLORS.slate500,
    fontSize: 14,
    textAlign: "center",
  },

  // Button
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonIcon: {
    fontSize: 18,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "600",
  },

  // Section header
  sectionHeader: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    opacity: 0.6,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },

  // Card
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  // Row
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 72,
    gap: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(25,127,230,0.12)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconText: {
    fontSize: 20,
  },
  rowContent: {
    flex: 1,
    justifyContent: "center",
  },
  rowLabel: {
    color: COLORS.slate400,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  rowValue: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
  },

  // Badge
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.slate800,
    marginLeft: 76,
  },

  // Footer
  footer: {
    marginTop: 32,
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    color: "#334155",
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});

export default ClientProfile;
