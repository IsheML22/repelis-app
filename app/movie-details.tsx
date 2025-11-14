// app/movie-details.tsx - VERSIÓN CON FONDO OSCURO
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Interface basada en la estructura común de APIs de películas (TMDB, etc.)
interface MovieDetails {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  genres?: { id: number; name: string }[];
  runtime?: number;
  production_companies?: { name: string }[];
}

// Tu función real para obtener detalles de la película
const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    console.log('Obteniendo detalles para ID:', movieId);
    
    // REEMPLAZA ESTO CON TU API KEY Y ENDPOINT REAL
    const API_KEY = '1f6804a0a3c691263e62fa9a527fa76a'; // ← Cambia por tu API key real
    const API_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Datos recibidos de API:', data);
    return data;
    
  } catch (error) {
    console.error('Error en getMovieDetails:', error);
    throw error;
  }
};

export default function MovieDetailsScreen() {
  const { movieId } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [inMyList, setInMyList] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!movieId) {
          throw new Error('No se proporcionó ID de película');
        }

        // Convertir movieId a número
        const id = Number(Array.isArray(movieId) ? movieId[0] : movieId);
        
        console.log('ID convertido:', id);

        if (isNaN(id)) {
          throw new Error('ID de película inválido');
        }

        const movieData = await getMovieDetails(id);
        console.log('Película cargada:', movieData.title);
        setMovie(movieData);
        
      } catch (err: any) {
        console.error('Error cargando película:', err);
        setError(err.message || 'Error al cargar los detalles de la película');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [movieId]);

  const toggleMyList = () => {
    setInMyList(!inMyList);
  };

  // Función para obtener el año de la fecha de estreno
  const getYearFromDate = (dateString: string) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  };

  // Función para construir la URL completa de la imagen
  const getImageUrl = (path: string | undefined, size: string = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750/333333/666666?text=Imagen+No+Disponible';
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="film" size={50} color="#666" />
        <Text style={styles.loadingText}>Cargando detalles de la película...</Text>
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="sad-outline" size={50} color="#FF4444" />
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity 
          style={styles.backButtonError}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con imagen de portada */}
      <View style={styles.heroSection}>
        <Image 
          source={{ uri: getImageUrl(movie.backdrop_path || movie.poster_path, 'w780') }} 
          style={styles.poster}
          resizeMode="cover"
        />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Overlay para mejor legibilidad */}
        <View style={styles.heroOverlay} />
      </View>

      {/* Información de la película */}
      <View style={styles.movieInfo}>
        <Text style={styles.title}># {movie.title}</Text>
        
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </Text>
          </View>
          <Text style={styles.year}>{getYearFromDate(movie.release_date)}</Text>
          {movie.runtime && (
            <Text style={styles.runtime}>{movie.runtime} min</Text>
          )}
        </View>

        {/* Géneros */}
        {movie.genres && movie.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {movie.genres.map((genre, index) => (
              <View key={genre.id} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre.name}</Text>
                {index < movie.genres!.length - 1 && (
                  <Text style={styles.genreSeparator}>•</Text>
                )}
              </View>
            ))}
          </View>
        )}

        <Text style={styles.description}>
          {movie.overview || 'Descripción no disponible.'}
        </Text>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={20} color="white" />
            <Text style={styles.playButtonText}>Reproducir</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.listButton, inMyList && styles.listButtonActive]}
            onPress={toggleMyList}
          >
            <Ionicons 
              name={inMyList ? "checkmark" : "add"} 
              size={20} 
              color={inMyList ? "white" : "#999"} 
            />
            <Text style={[
              styles.listButtonText, 
              inMyList && styles.listButtonTextActive
            ]}>
              Mi Lista
            </Text>
          </TouchableOpacity>
        </View>

        {/* Información adicional */}
        <View style={styles.additionalInfo}>
          <Text style={styles.infoTitle}>Información</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Fecha de estreno:</Text>
            <Text style={styles.infoValue}>
              {movie.release_date ? new Date(movie.release_date).toLocaleDateString('es-ES') : 'No disponible'}
            </Text>
          </View>
          {movie.production_companies && movie.production_companies.length > 0 && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Producción:</Text>
              <Text style={styles.infoValue}>
                {movie.production_companies.map(company => company.name).join(', ')}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.trendingSection}>
        <Text style={styles.trendingTitle}>Películas Similares</Text>
        <View style={styles.trendingContent}>
          <Text style={styles.trendingText}>Cargando películas similares...</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F', // Fondo oscuro principal
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0F0F0F', // Mismo fondo oscuro
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#CCCCCC', // Texto claro para contraste
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0F0F0F', // Mismo fondo oscuro
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButtonError: {
    backgroundColor: '#E50914', // Rojo Netflix-style
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  movieInfo: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#FFFFFF', // Texto blanco
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 15,
    flexWrap: 'wrap',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A', // Fondo oscuro para badges
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF', // Texto blanco
  },
  year: {
    fontSize: 16,
    color: '#CCCCCC', // Texto gris claro
    fontWeight: '500',
  },
  runtime: {
    fontSize: 14,
    color: '#CCCCCC',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 15,
    gap: 8,
  },
  genreTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  genreText: {
    fontSize: 14,
    color: '#E50914', // Rojo acento
    fontWeight: '500',
  },
  genreSeparator: {
    color: '#666',
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#CCCCCC', // Texto gris claro
    marginBottom: 25,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  playButton: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#E50914', // Rojo Netflix
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  listButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1A1A1A', // Fondo oscuro
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  listButtonActive: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  listButtonText: {
    color: '#999', // Texto gris
    fontWeight: '600',
    fontSize: 14,
  },
  listButtonTextActive: {
    color: 'white',
  },
  additionalInfo: {
    backgroundColor: '#1A1A1A', // Fondo oscuro
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF', // Texto blanco
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999', // Texto gris
    width: 120,
  },
  infoValue: {
    fontSize: 14,
    color: '#CCCCCC', // Texto gris claro
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#333', // Separador oscuro
    marginVertical: 20,
    marginHorizontal: 20,
  },
  trendingSection: {
    padding: 20,
    paddingTop: 0,
  },
  trendingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#FFFFFF', // Texto blanco
  },
  trendingContent: {
    padding: 15,
    backgroundColor: '#1A1A1A', // Fondo oscuro
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  trendingText: {
    color: '#666',
    fontSize: 16,
  },
});