import { getDatabase, onValue, ref } from 'firebase/database'; // Importar getDatabase, ref e onValue
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { auth, salvarVoto, usuarioJaVotou } from '../services/firebase'; // Importar funções do firebase e auth
import { getJogadores } from '../services/jogadoresService';

export default function Votacao() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userVotedPlayerId, setUserVotedPlayerId] = useState(null);
  const [votoContagem, setVotoContagem] = useState({}); // Novo estado para a contagem de votos em tempo real
  const [currentUser, setCurrentUser] = useState(null); // Estado para armazenar o usuário atual

  useEffect(() => {
    // Observar o estado de autenticação para obter o usuário atual
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    const fetchData = async () => {
      try {
        // Buscar jogadores
        const jogadoresData = await getJogadores();
        setJogadores(jogadoresData);

        // Verificar se o usuário já votou (somente se houver um usuário autenticado)
        if (currentUser) {
          const votou = await usuarioJaVotou(currentUser.uid);
          if (votou) {
            // Se o usuário já votou, buscar qual jogador ele votou (isso exigirá uma pequena modificação na função usuarioJaVotou ou uma nova função)
            // Por enquanto, apenas desabilitamos o botão para todos se ele já votou, ou podemos ajustar a lógica aqui
            // Para um MVP, podemos simplesmente desabilitar todos os botões de voto se usuarioJaVotou retornar true
            // Ou modificar usuarioJaVotou para retornar o ID do jogador votado
             const votoDoUsuario = await usuarioJaVotou(currentUser.uid); // Assumindo que usuarioJaVotou retorna o ID do jogador votado ou null/false
             if(votoDoUsuario) {
                 setUserVotedPlayerId(votoDoUsuario.playerId); // Ajustar de acordo com o retorno de usuarioJaVotou
             }

          }
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    
    // Configurar listener para contagem de votos em tempo real
    const database = getDatabase(); // Obter instância do Realtime Database
    const contagemVotosRef = ref(database, 'contagemVotos');
    const unsubscribeVotos = onValue(contagemVotosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVotoContagem(data);
      } else {
        setVotoContagem({}); // Resetar se não houver dados
      }
    });

    fetchData();

    // Cleanup subscription
    return () => {
      unsubscribe(); // Limpar listener de autenticação
      unsubscribeVotos(); // Limpar listener de votos
    };
  }, [currentUser]); // currentUser como dependência

  const handleVote = async (id) => {
    if (!currentUser) {
      Alert.alert('Erro', 'Você precisa estar logado para votar.');
      return;
    }

    if (userVotedPlayerId) {
      Alert.alert('Você já votou!', 'Você só pode votar uma vez.');
      return;
    }

    try {
      await salvarVoto(currentUser.uid, id); // Usar a função salvarVoto do Firebase
      Alert.alert('Sucesso', 'Seu voto foi registrado!');
      setUserVotedPlayerId(id); // Marcar que o usuário votou neste jogador

      // A contagem de votos será atualizada automaticamente pelo listener
    } catch (error) {
      console.error('Error saving vote:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar seu voto.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large" color="#01518b" />
        <Text style={{ color: '#1c1c1d', marginTop: 10 }}>Carregando jogadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Vote no Craque da Rodada</Text>
      <FlatList
        data={jogadores}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.row}>
                {/* Adicionar verificação para item.foto existir */}
                <Image source={{ uri: item.foto || 'placeholder_image_url' }} style={styles.imagem} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Title>{item.nome}</Title>
                  {/* Adicionar verificações para item.posicao e item.idade existirem */}
                  <Paragraph>{item.posicao || 'Posição não informada'} - {item.idade ? `${item.idade} anos` : 'Idade não informada'}</Paragraph>
                   {/* Exibir a contagem de votos diretamente do item do jogador, se disponível, ou 0 */}
                  <Paragraph>Votos: {(votoContagem[item.id] && votoContagem[item.id].votos) || 0}</Paragraph>
                  {/* Desabilitar o botão se o usuário já votou e o ID do jogador corresponder ao votado */}
                  <Button
                    mode="contained"
                    onPress={() => handleVote(item.id)}
                    style={styles.botao}
                    disabled={userVotedPlayerId !== null && userVotedPlayerId === item.id}
                  >
                    {userVotedPlayerId !== null && userVotedPlayerId === item.id ? 'Votado' : 'Votar'}
                  </Button>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f8eb',
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    color: '#01518b',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#97c5b4',
  },
  botao: {
    marginTop: 8,
    backgroundColor: '#01518b',
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#f9f8eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
