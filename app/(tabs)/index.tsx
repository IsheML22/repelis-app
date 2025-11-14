// app/(tabs)/index.tsx - VERSIÓN TEMPORAL
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import MovieCarousel from '../../components/MovieCarousel';
import MovieCategory from '../../components/MovieCategory';
import { getPopularMovies } from '../../src/api/movieService'; // Solo usar popular por ahora
import { Movie } from '../../src/api/movies';

export default function HomeScreen() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        // Usar solo popular por ahora, luego implementaremos los otros servicios
        const popularData = await getPopularMovies();
        
        // Simular diferentes categorías con los mismos datos por ahora
        setTrending(popularData.results.slice(0, 5));
        setPopular(popularData.results.slice(0, 10));
        setNowPlaying(popularData.results.slice(5, 15));
        setTopRated(popularData.results.slice(10, 20));
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <MovieCarousel movies={trending} />
        <MovieCategory title="Tendencia en Repelis" movies={popular} />
        <MovieCategory title="En cines ahora" movies={nowPlaying} />
        <MovieCategory title="Mejor calificadas" movies={topRated} />
        <MovieCategory title="Populares esta semana" movies={popular.slice(3)} />
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpace: {
    height: 80,
  },
});