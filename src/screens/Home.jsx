import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { getJogadores } from '../services/jogadoresService';
import { getNoticiasFutebol } from '../services/newsService'; // CORRETO AGORA

export default function Home() {
  const [jogadores, setJogadores] = useState([]);
  const [votoContagem, setVotoContagem] = useState({});
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      const data = await getJogadores();
      setJogadores(data);
    };

    const db = getDatabase();
    const contagemVotosRef = ref(db, 'contagemVotos');
    const unsubscribe = onValue(contagemVotosRef, snapshot => {
      const data = snapshot.val();
      setVotoContagem(data || {});
    });

    fetchJogadores();

    // Buscar notícias
    async function carregarNoticias() {
      const artigos = await getNoticiasFutebol(15);
      const artigosFiltrados = artigos.filter(n => n.title && n.url); // Filtra notícias válidas
      console.log('Notícias carregadas:', artigosFiltrados);
      setNoticias(artigosFiltrados);
    }
    carregarNoticias();

    return () => unsubscribe();
  }, []);

  const jogadoresOrdenados = [...jogadores].sort((a, b) => {
    const votosA = votoContagem[a.id]?.votos || 0;
    const votosB = votoContagem[b.id]?.votos || 0;
    return votosB - votosA;
  });

  const abrirNoticia = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert('Não foi possível abrir o link');
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloRanking}>🏆 Ranking Craque da Galera</Text>
      {jogadoresOrdenados.map((item, index) => (
        <View key={item.id.toString()} style={styles.cardRanking}>
          <Text style={styles.posicaoRanking}>{index + 1}º</Text>
          <Image source={{ uri: item.foto }} style={styles.fotoRanking} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text style={styles.nomeRanking}>{item.nome} ({item.posicao})</Text>
            <Text style={styles.votosRanking}>Votos: {votoContagem[item.id]?.votos || 0}</Text>

            {/* Estatísticas */}
            {item.estatisticas && (
              <View style={styles.estatisticasContainer}>
                {item.estatisticas.gols !== undefined && (
                  <Text style={styles.estatisticaTexto}>⚽ Gols: {item.estatisticas.gols}</Text>
                )}
                {item.estatisticas.assistencias !== undefined && (
                  <Text style={styles.estatisticaTexto}>🎯 Assistências: {item.estatisticas.assistencias}</Text>
                )}
                {item.estatisticas.passesCertos !== undefined && (
                  <Text style={styles.estatisticaTexto}>📈 Passes Certos: {item.estatisticas.passesCertos}</Text>
                )}
                {item.estatisticas.Defesas !== undefined && (
                  <Text style={styles.estatisticaTexto}>🧤 Defesas: {item.estatisticas.Defesas}</Text>
                )}
              </View>
            )}
          </View>
        </View>
      ))}

      {/* --- Notícias --- */}
      <View style={{ paddingVertical: 16, backgroundColor: '#f0f4e3' }}>
        <Text style={styles.tituloNoticias}>📰 Notícias do Momento</Text>
        {noticias.map((item) => (
          <TouchableOpacity key={item.url} style={styles.cardNoticia} onPress={() => abrirNoticia(item.url)}>
            {item.urlToImage && (
              <Image source={{ uri: item.urlToImage }} style={styles.imagemNoticia} />
            )}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.tituloNoticia}>{item.title}</Text>
              <Text style={styles.descricaoNoticia} numberOfLines={3}>{item.description}</Text>
              <Text style={styles.leiaMaisNoticia}>Leia mais...</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f8eb',
    flex: 1,
    padding: 16,
  },
  tituloRanking: {
    fontSize: 20,
    color: '#01518b',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  cardRanking: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#97c5b4',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  posicaoRanking: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#01518b',
    width: 30,
  },
  fotoRanking: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nomeRanking: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  votosRanking: {
    color: '#01518b',
  },
  tituloNoticias: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0a3e3e',
  },
  cardNoticia: {
    flexDirection: 'row',
    backgroundColor: '#a6d6d6',
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
  },
  imagemNoticia: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  tituloNoticia: {
    fontWeight: 'bold',
    color: '#0a3e3e',
  },
  descricaoNoticia: {
    marginTop: 4,
    color: '#0a3e3e',
  },
  leiaMaisNoticia: {
    marginTop: 4,
    color: '#034a4a',
    fontWeight: 'bold',
  },
});
