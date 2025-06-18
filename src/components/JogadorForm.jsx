import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const JogadorForm = ({ formState, setFormState, onSave, isEditing }) => {
  return (
    <View style={styles.form}>
      <TextInput
        label="Nome"
        value={formState.nome}
        onChangeText={(text) => setFormState({ ...formState, nome: text })}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Idade"
        keyboardType="numeric"
        value={formState.idade}
        onChangeText={(text) => setFormState({ ...formState, idade: text })}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Posição"
        value={formState.posicao}
        onChangeText={(text) => setFormState({ ...formState, posicao: text })}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="Time"
        value={formState.time}
        onChangeText={(text) => setFormState({ ...formState, time: text })}
        style={styles.input}
        mode="outlined"
      />
      <TextInput
        label="URL da Foto"
        value={formState.foto}
        onChangeText={(text) => setFormState({ ...formState, foto: text })}
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={onSave}
        style={styles.botao}
        labelStyle={styles.botaoTexto}
      >
        {isEditing ? 'Atualizar Jogador' : 'Adicionar Jogador'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
    backgroundColor: '#f9f8eb',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    marginBottom: 10,
  },
  botao: {
    marginTop: 10,
  },
  botaoTexto: {
    fontWeight: 'bold',
  },
});

export default JogadorForm;