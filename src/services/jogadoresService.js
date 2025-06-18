let jogadoresFicticios = [
  {
    id: 1,
    nome: 'Yuri Alberto',
    posicao: 'Atacante',
    idade: 24,
    time: 'Corithians',
    foto: 'https://i.pinimg.com/736x/f0/1e/77/f01e77f156865240700213e36161c556.jpg',
    votos: 0,
    estatisticas: {
      gols: 2,
      assistencias: 1,
      passesCertos: 35,
    },
  },
  {
    id: 2,
    nome: 'Agustín Rossi',
    posicao: 'Goleiro',
    idade: 29,
    time: 'Flamengo',
    foto: 'https://i.pinimg.com/736x/1a/de/17/1ade171dcab8a5cecaef071284a4ddbb.jpg',
    votos: 0,
    estatisticas: {
      gols: 0,
      Defesas: 5,
    },
  },
  {
    id: 3,
    nome: 'Estevão',
    posicao: 'Ponta',
    idade: 18,
    time: 'Palmeiras',
    foto: 'https://i.pinimg.com/736x/f1/d0/63/f1d0633d2fac40bdac899d1275c3cebe.jpg',
    votos: 0,
    estatisticas: {
      gols: 0,
      assistencias: 2,
      passesCertos: 60,
    },
  },
];

export const getJogadores = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jogadoresFicticios), 100);
  });
};

export const addJogador = async (novoJogador) => {
  return new Promise((resolve) => {
    const novoId = jogadoresFicticios.length > 0
      ? Math.max(...jogadoresFicticios.map(j => j.id)) + 1
      : 1;
    const jogadorComId = { ...novoJogador, id: novoId, votos: 0 };
    jogadoresFicticios = [...jogadoresFicticios, jogadorComId];
    setTimeout(() => resolve(jogadorComId), 100);
  });
};

export const updateJogador = async (id, dadosAtualizados) => {
  return new Promise((resolve, reject) => {
    const index = jogadoresFicticios.findIndex(j => j.id === id);
    if (index > -1) {
      jogadoresFicticios[index] = { ...jogadoresFicticios[index], ...dadosAtualizados };
      setTimeout(() => resolve(jogadoresFicticios[index]), 100);
    } else {
      reject(new Error('Jogador não encontrado'));
    }
  });
};

export const deleteJogador = async (id) => {
  return new Promise((resolve, reject) => {
    const existe = jogadoresFicticios.some(j => j.id === id);
    if (existe) {
      jogadoresFicticios = jogadoresFicticios.filter(j => j.id !== id);
      setTimeout(() => resolve(true), 100);
    } else {
      reject(new Error('Jogador não encontrado'));
    }
  });
};

// As funções abaixo não estão sendo usadas no momento
export const addVote = async (id) => {
  return new Promise((resolve, reject) => {
    const index = jogadoresFicticios.findIndex(j => j.id === id);
    if (index > -1) {
      const updatedJogadores = [...jogadoresFicticios];
      updatedJogadores[index] = {
        ...updatedJogadores[index],
        votos: updatedJogadores[index].votos + 1,
      };
      jogadoresFicticios = updatedJogadores;
      setTimeout(() => resolve(jogadoresFicticios), 100);
    } else {
      reject(new Error('Jogador não encontrado'));
    }
  });
};

export const removeVote = async (id) => {
  return new Promise((resolve, reject) => {
    const index = jogadoresFicticios.findIndex(j => j.id === id);
    if (index > -1) {
      const updatedJogadores = [...jogadoresFicticios];
      if (updatedJogadores[index].votos > 0) {
        updatedJogadores[index] = {
          ...updatedJogadores[index],
          votos: updatedJogadores[index].votos - 1,
        };
      }
      jogadoresFicticios = updatedJogadores;
      setTimeout(() => resolve(jogadoresFicticios), 100);
    } else {
      reject(new Error('Jogador não encontrado'));
    }
  });
};

export const resetVotes = async () => {
  return new Promise((resolve) => {
    const resetedJogadores = jogadoresFicticios.map(jogador => ({
      ...jogador,
      votos: 0,
    }));
    jogadoresFicticios = resetedJogadores;
    setTimeout(() => resolve(jogadoresFicticios), 100);
  });
};

