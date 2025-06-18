import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addJogador, deleteJogador, getJogadores, updateJogador } from '../services/jogadoresService';
import JogadorForm from '../components/JogadorForm';
import JogadorItem from '../components/JogadorItem';

export default function JogadoresAdmin() {
  const [jogadores, setJogadores] = useState([]);
  const [form, setForm] = useState({ nome: '', idade: '', posicao: '', time: '', foto: '' });
  const [editandoId, setEditandoId] = useState(null);

  const carregarJogadores = async () => {
    const data = await getJogadores();
    setJogadores(data);
  };

  useEffect(() => {
    carregarJogadores();
  }, []);

  const handleSalvar = async () => {
    if (!form.nome || !form.idade || !form.posicao) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (editandoId !== null) {
      await updateJogador(editandoId, form);
      Alert.alert('Sucesso', 'Jogador atualizado.');
    } else {
      await addJogador(form);
      Alert.alert('Sucesso', 'Jogador adicionado.');
    }

    setForm({ nome: '', idade: '', posicao: '', time: '', foto: '' });
    setEditandoId(null);
    carregarJogadores();
  };

  const handleEditar = (jogador) => {
    setForm({
      nome: jogador.nome,
      idade: jogador.idade.toString(),
      posicao: jogador.posicao,
      time: jogador.time,
      foto: jogador.foto,
    });
    setEditandoId(jogador.id);
  };

  const handleExcluir = async (id) => {
    Alert.alert('Confirmar exclusão', 'Deseja excluir este jogador?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          await deleteJogador(id);
          carregarJogadores();
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Jogadores</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={form.nome}
          onChangeText={(text) => setForm({ ...form, nome: text })}
        />
        <TextInput
          placeholder="Idade"
          keyboardType="numeric"
          style={styles.input}
          value={form.idade}
          onChangeText={(text) => setForm({ ...form, idade: text })}
        />
        <TextInput
          placeholder="Posição"
          style={styles.input}
          value={form.posicao}
          onChangeText={(text) => setForm({ ...form, posicao: text })}
        />
        <TextInput
          placeholder="Time"
          style={styles.input}
          value={form.time}
          onChangeText={(text) => setForm({ ...form, time: text })}
        />
        <TextInput
          placeholder="URL da Foto"
          style={styles.input}
          value={form.foto}
          onChangeText={(text) => setForm({ ...form, foto: text })}
        />

        <TouchableOpacity onPress={handleSalvar} style={styles.botao}>
          <Text style={styles.botaoTexto}>{editandoId ? 'Atualizar' : 'Adicionar'}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jogadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>{item.posicao} - {item.idade} anos - {item.time}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEditar(item)} style={styles.editar}>
              <Text>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleExcluir(item.id)} style={styles.excluir}>
              <Text>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f8eb' },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#01518b' },
  form: { marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    marginBottom: 8,
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  botao: {
    backgroundColor: '#01518b',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#97c5b4',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  nome: { fontWeight: 'bold' },
  info: { color: '#333' },
  editar: { padding: 6 },
  excluir: { padding: 6, marginLeft: 8 },
});
