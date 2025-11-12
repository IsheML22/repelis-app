// components/MovieCarousel.tsx - VERSIÓN MEJORADA
import React from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Movie } from '../src/api/movies';

const { width } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 500;

type Props = {
  movies: Movie[];
};

export default function MovieCarousel({ movies }: Props) {
  // Función para acortar títulos largos
  const shortenTitle = (title: string, maxLength: number = 25) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  // Función para acortar descripciones
  const shortenOverview = (overview: string, maxLength: number = 120) => {
    if (!overview) return 'Descripción no disponible';
    if (overview.length <= maxLength) return overview;
    return overview.substring(0, maxLength) + '...';
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={CAROUSEL_HEIGHT}
        autoPlay
        data={movies}
        scrollAnimationDuration={1200}
        renderItem={({ item, index }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w1280${item.poster_path}` }}
              style={styles.image}
              resizeMode="cover"
            />
            
            {/* Gradient Overlays */}
            <View style={styles.darkOverlay} />
            <View style={styles.bottomGradient} />
            
            {/* Movie Info - Mejorada */}
            <View style={styles.movieInfo}>
              <Text style={styles.title}>
                {shortenTitle(item.title)}
              </Text>
              
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {item.vote_average?.toFixed(1) || 'N/A'}</Text>
                <Text style={styles.year}>
                  {item.release_date ? new Date(item.release_date).getFullYear() : 'N/A'}
                </Text>
              </View>
              
              <Text style={styles.overview} numberOfLines={3}>
                {shortenOverview(item.overview)}
              </Text>
              
              {/* Botones de acción estilo Netflix */}
              <View style={styles.actionButtons}>
                <View style={[styles.button, styles.playButton]}>
                  <Text style={styles.playText}>▶ Reproducir</Text>
                </View>
                <View style={[styles.button, styles.infoButton]}>
                  <Text style={styles.infoText}>+ Mi Lista</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  slide: {
    position: 'relative',
    height: CAROUSEL_HEIGHT,
  },
  image: {
    width: '100%',
    height: CAROUSEL_HEIGHT,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.3)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(13, 13, 13, 0.85)',
  },
  movieInfo: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    lineHeight: 32,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
  },
  rating: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  year: {
    fontSize: 16,
    color: '#cccccc',
    fontWeight: '500',
  },
  overview: {
    fontSize: 14,
    color: '#e0e0e0',
    lineHeight: 20,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    minWidth: 120,
  },
  playButton: {
    backgroundColor: '#ffffff',
  },
  playText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoButton: {
    backgroundColor: 'rgba(109, 109, 110, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});