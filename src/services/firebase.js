import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
  onAuthStateChanged,
  signInAnonymously,
  signOut
} from 'firebase/auth';
import {
  get,
  getDatabase,
  push,
  ref,
  remove,
  runTransaction,
  set
} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVBdWFYFE12RT-7ByiTw2Bs9UDf06-6oc",
  authDomain: "craque-da-bola.firebaseapp.com",
  databaseURL: 'https://craque-da-bola-default-rtdb.firebaseio.com',
  projectId: "craque-da-bola",
  storageBucket: "craque-da-bola.firebasestorage.app",
  messagingSenderId: "235680073295",
  appId: "1:235680073295:web:661cb783340ae170130c3a"
};

// Inicializar o app Firebase (garantindo que só seja feito uma vez)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

// Inicializar o Auth com persistência correta para React Native
let auth;
try {
  auth = getAuth(app);
  
} catch (e) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Inicializar o banco de dados
const database = getDatabase(app);

// ===========================
// Funções auxiliares
// ===========================

async function signInAnonymous() {
  try {
    await signInAnonymously(auth);
    console.log('Signed in anonymously');
  } catch (error) {
    console.error('Anonymous sign in failed:', error);
  }
}

async function salvarDadosUsuario(userId, userData) {
  try {
    await set(ref(database, 'users/' + userId), userData);
    console.log(`Dados do usuário ${userId} salvos com sucesso.`);
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    throw error;
  }
}

async function usuarioJaVotou(userId) {
  try {
    const snapshot = await get(ref(database, 'votos/' + userId));
    return snapshot.exists() ? snapshot.val().playerId : false;
  } catch (error) {
    console.error('Error checking if user voted:', error);
    throw error;
  }
}

async function salvarVoto(userId, playerId) {
  try {
    await set(ref(database, 'votos/' + userId), { playerId });
    const contagemRef = ref(database, 'contagemVotos/' + playerId);

    await runTransaction(contagemRef, (currentData) => {
      if (currentData === null) return { votos: 1 };
      currentData.votos++;
      return currentData;
    });
  } catch (error) {
    console.error('Error saving vote to Realtime Database:', error);
    throw error;
  }
}

async function removerVoto(userId) {
  try {
    await remove(ref(database, 'votos/' + userId));
    console.log(`Voto do usuário ${userId} removido.`);
  } catch (error) {
    console.error('Error removing user vote:', error);
    throw error;
  }
}

async function resetarVotos() {
  try {
    await remove(ref(database, 'votos'));
    await remove(ref(database, 'contagemVotos'));
    console.log('Todos os votos e a contagem foram resetados.');
  } catch (error) {
    console.error('Error resetting all votes:', error);
    throw error;
  }
}

async function adicionarJogador(jogador) {
  try {
    await push(ref(database, 'jogadores'), jogador);
    console.log('Jogador adicionado com sucesso.');
  } catch (error) {
    console.error('Error adding player:', error);
    throw error;
  }
}

async function atualizarJogador(playerId, dadosAtualizados) {
  try {
    await set(ref(database, 'jogadores/' + playerId), dadosAtualizados);
    console.log(`Dados do jogador ${playerId} atualizados com sucesso.`);
  } catch (error) {
    console.error('Error updating player:', error);
    throw error;
  }
}

async function deletarJogador(playerId) {
  try {
    await remove(ref(database, 'jogadores/' + playerId));
    console.log(`Jogador ${playerId} deletado com sucesso.`);
  } catch (error) {
    console.error('Error deleting player:', error);
    throw error;
  }
}

const fazerLogout = async () => {
  try {
    await signOut(auth); // precisa passar o `auth` como argumento
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error; // repassa para quem chamou
  }
};

// ===========================
// Exportações
// ===========================

export {
  adicionarJogador, app, atualizarJogador, auth,
  database, db, deletarJogador, fazerLogout, onAuthStateChanged, removerVoto, resetarVotos, salvarDadosUsuario, salvarVoto, signInAnonymous,
  usuarioJaVotou
};

