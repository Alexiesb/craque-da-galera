import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function RankingItem({ player, index, voteCount }) {
  return (
    <View style={styles.cardRanking}>
      <Text style={styles.posicaoRanking}>{index + 1}º</Text>
      <Image source={{ uri: player.foto }} style={styles.fotoRanking} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.nomeRanking}>
          {player.nome} ({player.posicao})
        </Text>
        <Text style={styles.votosRanking}>Votos: {voteCount || 0}</Text>

        {/* Estatísticas */}
        {player.estatisticas && (
          <View style={styles.estatisticasContainer}>
            {player.estatisticas.gols !== undefined && (
              <Text style={styles.estatisticaTexto}>⚽ Gols: {player.estatisticas.gols}</Text>
            )}
            {player.estatisticas.assistencias !== undefined && (
              <Text style={styles.estatisticaTexto}>🎯 Assistências: {player.estatisticas.assistencias}</Text>
            )}
            {player.estatisticas.passesCertos !== undefined && (
              <Text style={styles.estatisticaTexto}>📈 Passes Certos: {player.estatisticas.passesCertos}</Text>
            )}
            {player.estatisticas.Defesas !== undefined && (
              <Text style={styles.estatisticaTexto}>🧤 Defesas: {player.estatisticas.Defesas}</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  estatisticasContainer: {
    marginTop: 5,
  },
  estatisticaTexto: {
    fontSize: 12,
    color: '#0a3e3e',
  },
});