import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

export default function PerfilCard({ userData, email, onChangePhoto, loading }) {
  return (
    <View style={styles.container}>
      <Avatar.Image
        size={100}
        source={
          userData?.foto
            ? { uri: userData.foto }
            : require('../../assets/avatar-placeholder.jpeg')
        }
        style={styles.avatar}
      />
      <Button mode="text" onPress={onChangePhoto} disabled={loading}>
        {loading ? 'Atualizando...' : 'Alterar Foto'}
      </Button>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{userData?.nome || 'Não informado'}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email || 'Não informado'}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{userData?.telefone || 'Não informado'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    marginBottom: 5,
  },
});
