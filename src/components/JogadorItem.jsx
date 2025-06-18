import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';

const JogadorItem = ({ player, onEdit, onDelete }) => {
  return (
    <Card style={styles.cardItem} elevation={2}>
      <View style={styles.itemContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{player.nome}</Text>
          <Text style={styles.info}>
            {player.posicao} - {player.idade} anos - {player.time}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onEdit(player)} style={styles.editar}>
          <Text>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(player.id)} style={styles.excluir}>
          <Text>❌</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardItem: {
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: '#97c5b4',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  info: {
    color: '#333',
    fontSize: 14,
  },
  editar: {
    padding: 6,
  },
  excluir: {
    padding: 6,
    marginLeft: 8,
  },
});

export default JogadorItem;