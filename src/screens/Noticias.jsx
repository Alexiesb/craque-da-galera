import React, { useEffect, useState } from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, Card, Paragraph } from 'react-native-paper';
import { getNews } from '../services/newsService';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const dados = await getNews();
      setNoticias(dados);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" color="#01518b" />
        <Text style={{ marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={noticias}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.title} />
          <Card.Content>
            <Paragraph>{item.content}</Paragraph>
            <Paragraph>Autor: {item.author}</Paragraph>
            <Paragraph>Data: {item.date}</Paragraph>
            <Button onPress={() => Linking.openURL(item.url)}>Ler mais</Button>
          </Card.Content>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f8eb',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#97c5b4',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f8eb',
  },
});