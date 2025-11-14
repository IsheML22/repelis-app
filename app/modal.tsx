// app/modal.tsx - PANTALLA DE CONFIGURACIÓN MEJORADA
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';

export default function ModalScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      {/* HEADER DEL MODAL */}
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: 'Configuración',
          headerStyle: styles.header,
          headerTintColor: '#FFFFFF',
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
        }} 
      />

      {/* CONTENIDO DE CONFIGURACIÓN */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* TARJETA DE USUARIO */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color="#FFFFFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Usuario Repelis</Text>
            <Text style={styles.userEmail}>usuario@repelis.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#E50914" />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN DE PREFERENCIAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          
          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="moon" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Modo Oscuro</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#767577', true: '#E50914' }}
              thumbColor={isDarkMode ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          <View style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="notifications" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Notificaciones</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#E50914' }}
              thumbColor={notifications ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <MaterialIcons name="language" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Idioma</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.optionValue}>Español</Text>
              <Ionicons name="chevron-forward" size={18} color="#666666" />
            </View>
          </TouchableOpacity>
        </View>

        {/* SECCIÓN DE CUENTA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="person-circle" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Mi Perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="card" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Suscripción</Text>
            </View>
            <View style={styles.optionRight}>
              <Text style={styles.premiumBadge}>PREMIUM</Text>
              <Ionicons name="chevron-forward" size={18} color="#666666" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="help-buoy" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Ayuda y Soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* SECCIÓN DE LA APLICACIÓN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aplicación</Text>
          
          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="information-circle" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Acerca de Repelis</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="shield-checkmark" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Privacidad y Seguridad</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <View style={styles.optionLeft}>
              <Ionicons name="document-text" size={22} color="#CCCCCC" />
              <Text style={styles.optionText}>Términos de Servicio</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* BOTONES DE ACCIÓN */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color="#E50914" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Repelis v2.1.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    backgroundColor: '#141414',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#333333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E50914',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#E50914',
    borderRadius: 8,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginLeft: 12,
    fontWeight: '500',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    marginRight: 8,
  },
  premiumBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E50914',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  actionSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 9, 20, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.3)',
    width: '100%',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E50914',
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});