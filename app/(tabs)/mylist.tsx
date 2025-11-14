// app/(tabs)/mylist.tsx - PANTALLA MI LISTA
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MyListScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📥 Mi Lista</Text>
      <Text style={styles.subtitle}>Tus películas guardadas aparecerán aquí</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#b3b3b3',
  },
});