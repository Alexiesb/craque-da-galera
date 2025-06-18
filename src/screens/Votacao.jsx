import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import VotationPlayerCard from '../components/VotationPlayerCard';
import { auth, salvarVoto, usuarioJaVotou } from '../services/firebase';
import { getJogadores } from '../services/jogadoresService';

export default function Votacao() {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userVotedPlayerId, setUserVotedPlayerId] = useState(null);
  const [votoContagem, setVotoContagem] = useState({}); 
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    const fetchData = async () => {
      try {
    
        const jogadoresData = await getJogadores();
        setJogadores(jogadoresData);

        if (currentUser) {
          const votou = await usuarioJaVotou(currentUser.uid);
          if (votou) {
             const votoDoUsuario = await usuarioJaVotou(currentUser.uid); 
             if(votoDoUsuario) {
                 setUserVotedPlayerId(votoDoUsuario.playerId); 
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
 
    const database = getDatabase(); 
    const contagemVotosRef = ref(database, 'contagemVotos');
    const unsubscribeVotos = onValue(contagemVotosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVotoContagem(data);
      } else {
        setVotoContagem({});
      }
    });

    fetchData();

   
    return () => {
      unsubscribe(); 
      unsubscribeVotos(); 
    };
  }, [currentUser]); 

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
      await salvarVoto(currentUser.uid, id);
      Alert.alert('Sucesso', 'Seu voto foi registrado!');
      setUserVotedPlayerId(id); 
    
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
        renderItem={({ item }) => {
          const votes = (votoContagem[item.id] && votoContagem[item.id].votos) || 0;
          return (
            <VotationPlayerCard
              player={item}
              voteCount={votes}
              userVotedPlayerId={userVotedPlayerId}
              onVote={() => handleVote(item.id)}
            />
          );
        }}
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
