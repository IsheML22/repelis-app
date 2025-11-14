// app/(tabs)/profile.tsx - REDIRECCIÓN AUTOMÁTICA AL MODAL
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir automáticamente al modal cuando se accede a esta pantalla
    router.push('/modal');
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F0F0F' }}>
      <ActivityIndicator size="large" color="#E50914" />
    </View>
  );
}