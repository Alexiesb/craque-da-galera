import React, { createContext, useEffect, useState } from 'react';
import * as jogadoresService from '../services/jogadoresService';

export const JogadoresContext = createContext();

export const JogadoresProvider = ({ children }) => {
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    jogadoresService.getJogadores().then(setJogadores);
  }, []);

  const addJogador = async (novoJogador) => {
    const jogador = await jogadoresService.addJogador(novoJogador);
    setJogadores(prev => [...prev, jogador]);
  };

  const updateJogador = async (id, dadosAtualizados) => {
    const jogador = await jogadoresService.updateJogador(id, dadosAtualizados);
    setJogadores(prev => prev.map(j => j.id === id ? jogador : j));
  };

  const deleteJogador = async (id) => {
    await jogadoresService.deleteJogador(id);
    setJogadores(prev => prev.filter(j => j.id !== id));
  };

  return (
    <JogadoresContext.Provider value={{ jogadores, addJogador, updateJogador, deleteJogador }}>
      {children}
    </JogadoresContext.Provider>
  );
};
