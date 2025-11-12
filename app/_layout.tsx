// app/(tabs)/_layout.tsx - NAVEGACIÓN PRINCIPAL CON CONFIGURACIÓN
import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#8C8C8C',
        tabBarLabelStyle: styles.tabBarLabel,
        sceneStyle: styles.scene,
      }}>
      
      {/* PANTALLA DE INICIO */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      {/* PANTALLA DE EXPLORAR */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <MaterialIcons 
                name="explore" 
                size={24} 
                color={color} 
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      {/* PANTALLA DE MI LISTA */}
      <Tabs.Screen
        name="mylist"
        options={{
          title: 'Mi Lista',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Ionicons 
                name={focused ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color={color} 
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
      />

      {/* PANTALLA DE CONFIGURACIÓN - REDIRIGE AL MODAL */}
      <Tabs.Screen
        name="profile" // Mantenemos el nombre del archivo, pero cambiamos la opción
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.iconContainerActive : styles.iconContainer}>
              <Ionicons 
                name={focused ? "settings" : "settings-outline"} 
                size={24} 
                color={color} 
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevenir la navegación normal y abrir el modal
            e.preventDefault();
            router.push('/modal');
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#141414',
    borderTopColor: '#333333',
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 12,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  scene: {
    backgroundColor: '#0F0F0F',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  iconContainerActive: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    transform: [{ translateY: -2 }],
  },
  activeIndicator: {
    position: 'absolute',
    top: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E50914',
  },
});