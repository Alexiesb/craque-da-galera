import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NewsCard = ({ article, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardNoticia} onPress={onPress}>
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.imagemNoticia} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.tituloNoticia}>{article.title}</Text>
        <Text style={styles.descricaoNoticia} numberOfLines={3}>
          {article.description}
        </Text>
        <Text style={styles.leiaMaisNoticia}>Leia mais...</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardNoticia: {
    flexDirection: 'row',
    backgroundColor: '#a6d6d6',
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    elevation: 2, // Adiciona uma pequena sombra para dar profundidade
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imagemNoticia: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
  },
  tituloNoticia: {
    fontWeight: 'bold',
    color: '#0a3e3e',
    fontSize: 16, // Aumenta um pouco o tamanho da fonte
    marginBottom: 4,
  },
  descricaoNoticia: {
    marginTop: 4,
    color: '#0a3e3e',
    fontSize: 13, // Tamanho da fonte para descrição
  },
  leiaMaisNoticia: {
    marginTop: 4,
    color: '#034a4a',
    fontWeight: 'bold',
    fontSize: 12, // Tamanho da fonte para "Leia mais"
  },
});

export default NewsCard;