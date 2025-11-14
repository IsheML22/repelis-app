// components/MovieCard.tsx - ARCHIVO COMPLETO CORREGIDO
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Movie } from '../src/api/movies';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  movie: Movie;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
};

const MovieCard = ({ movie, size = 'medium', onPress }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      console.log('🎬 Navegando a detalles:', {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path
      });
      
      router.push({
        pathname: '/movie-details',
        params: { 
          movieId: movie.id.toString()
        }
      });
    }
  };

  const getSize = () => {
    const cardWidth = screenWidth * 0.28;
    const cardHeight = cardWidth * 1.5;
    
    switch (size) {
      case 'small': return { width: screenWidth * 0.22, height: (screenWidth * 0.22) * 1.5 };
      case 'large': return { width: screenWidth * 0.32, height: (screenWidth * 0.32) * 1.5 };
      default: return { width: cardWidth, height: cardHeight };
    }
  };

  const { width, height } = getSize();

  const shortenTitle = (title: string, maxLength: number = 16) => {
    if (!title) return 'Sin título';
    const cleanTitle = title.trim();
    
    if (cleanTitle.length <= maxLength) return cleanTitle;
    
    const naturalBreak = cleanTitle.lastIndexOf(' ', maxLength);
    if (naturalBreak > 10) {
      return cleanTitle.substring(0, naturalBreak) + '...';
    }
    
    return cleanTitle.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { width }]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={[styles.poster, { width, height }]}
        resizeMode="cover"
      />
      
      {movie.vote_average > 0 && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {movie.vote_average.toFixed(1)}</Text>
        </View>
      )}
      
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {shortenTitle(movie.title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// ✅ Asegurar que tiene export default
export default MovieCard;

const styles = StyleSheet.create({
  card: {
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  poster: {
    borderRadius: 6,
    backgroundColor: '#1a1a1a',
  },
  ratingBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
    minWidth: 32,
  },
  ratingText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleContainer: {
    marginTop: 4,
    paddingHorizontal: 2,
    minHeight: 32,
    justifyContent: 'center',
  },
  movieTitle: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 12,
  },
});