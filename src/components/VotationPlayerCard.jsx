// src/components/VotationPlayerCard.jsx
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Text } from 'react-native-paper';

export default function VotationPlayerCard({ player, voteCount, userVotedPlayerId, onVote }) {
  const isVoted = userVotedPlayerId !== null && userVotedPlayerId === player.id;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Image source={{ uri: player.foto || 'placeholder_image_url' }} style={styles.imagem} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text>{player.nome}</Text>
            <Paragraph>{player.posicao || 'Posição não informada'} - {player.idade ? `${player.idade} anos` : 'Idade não informada'}</Paragraph>
            <Paragraph>Votos: {(voteCount[player.id] && voteCount[player.id].votos) || 0}</Paragraph>
            <Button
              mode="contained"
              onPress={() => onVote(player.id)}
              style={styles.botao}
              disabled={isVoted}
            >
              {isVoted ? 'Votado' : 'Votar'}
            </Button>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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
});