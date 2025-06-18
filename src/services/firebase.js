// src/services/firebase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'; // Adicionado getAuth
import { get, getDatabase, push, ref, remove, runTransaction, set } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyDVBdWFYFE12RT-7ByiTw2Bs9UDf06-6oc",
  authDomain: "craque-da-bola.firebaseapp.com",
  projectId: "craque-da-bola",
  storageBucket: "craque-da-bola.firebasestorage.app",
  messagingSenderId: "235680073295",
  appId: "1:235680073295:web:661cb783340ae170130c3a"
};

// Inicializa o app Firebase, evitando múltiplas inicializações
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa o Auth com persistência usando AsyncStorage para React Native, evitando múltiplas inicializações
const auth = getAuth(app) || initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage),
}); // Usando getAuth para evitar inicialização duplicada

// Inicializa Realtime Database
const database = getDatabase(app);

// Função para iniciar autenticação anônima, pode ser chamada no seu App.js por exemplo
async function signInAnonymous() {
  try {
    await signInAnonymously(auth);
    console.log('Signed in anonymously');
  } catch (error) {
    console.error('Anonymous sign in failed:', error);
  }
}

// Função para verificar se o usuário já votou
async function usuarioJaVotou(userId) {
  try {
    const snapshot = await get(ref(database, 'votos/' + userId));
    if (snapshot.exists()) {
      return snapshot.val().playerId; // Retorna apenas o playerId se o voto for encontrado
    } else {
      return false; // Usuário não votou
    }
  } catch (error) {
    console.error('Error checking if user voted:', error);
 throw error;
  }
}

// Função para salvar voto no Realtime Database
async function salvarVoto(userId, playerId) {
  try {
    await set(ref(database, 'votos/' + userId), { playerId: playerId });

    // Atualizar a contagem de votos no nó contagemVotos
    const contagemRef = ref(database, 'contagemVotos/' + playerId);
    // Import get from firebase/database to use it here if needed for initial check,
    // but runTransaction handles the read implicitly.
    // Example with transaction to increment vote count:
    await runTransaction(contagemRef, (currentData) => { // Usando runTransaction para incrementar atomicamente
      if (currentData === null) {
        return { votos: 1 };
      } else {
        currentData.votos++;
        return currentData;
      }
    });
  } catch (error) {
    console.error('Error saving vote to Realtime Database:', error);
    throw error; // Rejeitar o erro para ser tratado no componente
}
}
// Você pode exportar as funções para usar no seu componente principal

// Nova função para remover o voto de um usuário
async function removerVoto(userId) {
  try {
    const voteRef = ref(database, 'votos/' + userId);
    await remove(voteRef);
    console.log(`Voto do usuário ${userId} removido.`);
  } catch (error) {
    console.error('Error removing user vote:', error);
 throw error;
  }
}

// Nova função para resetar todos os votos
async function resetarVotos() {
  try {
    // Remover todos os votos individuais
    const votosRef = ref(database, 'votos');
    await remove(votosRef);

    // Resetar a contagem de votos
    const contagemVotosRef = ref(database, 'contagemVotos');
    await remove(contagemVotosRef);

    console.log('Todos os votos e a contagem foram resetados.');
  } catch (error) {
    console.error('Error resetting all votes:', error);
 throw error;
  }
}

// Funções CRUD para jogadores

// Função para adicionar um novo jogador
async function adicionarJogador(jogador) {
  try {
    const jogadoresRef = ref(database, 'jogadores');
    await push(jogadoresRef, jogador);
    console.log('Jogador adicionado com sucesso.');
  } catch (error) {
    console.error('Error adding player:', error);
 throw error;
  }
}

// A função getJogadores já está em ../services/jogadoresService.js e deve ser usada a partir de lá.
// Não precisamos duplicá-la aqui.

// Função para atualizar um jogador existente
async function atualizarJogador(playerId, dadosAtualizados) {
  try {
    const jogadorRef = ref(database, 'jogadores/' + playerId);
    await set(jogadorRef, dadosAtualizados); // set substitui os dados existentes
    console.log(`Dados do jogador ${playerId} atualizados com sucesso.`);
  } catch (error) {
    console.error('Error updating player:', error);
 throw error;
  }
}

// Função para deletar um jogador
async function deletarJogador(playerId) {
  try {
    const jogadorRef = ref(database, 'jogadores/' + playerId);
    await remove(jogadorRef);
    console.log(`Jogador ${playerId} deletado com sucesso.`);
  } catch (error) {
    console.error('Error deleting player:', error);
 throw error;
  }
}

export {
  adicionarJogador, // Exportando a nova função
  atualizarJogador, auth,
  database, // Exportando a nova função
  deletarJogador // Exportando a nova função
  , onAuthStateChanged, removerVoto, // Exportando a nova função
  resetarVotos, salvarVoto,
  signInAnonymous,
  usuarioJaVotou
};

