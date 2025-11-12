// components/MovieCategory.tsx - VERSIÓN DEBUG
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Movie } from '../src/api/movies';
import MovieCard from './MovieCard';

type Props = {
  title: string;
  movies: Movie[];
};

export default function MovieCategory({ title, movies }: Props) {
  console.log(`Category ${title} has ${movies.length} movies`);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {movies.length > 0 ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            console.log('Rendering movie:', item.title);
            return <MovieCard movie={item} size="medium" />;
          }}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>No hay películas disponibles</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 30,
    marginTop: 10,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#ffffff', 
    marginBottom: 15, 
    marginLeft: 15,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});