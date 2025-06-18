// src/screens/Login.jsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { auth } from '../services/firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
 
  const handleLogin = async () => {
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
 return;
    }

    if (!email.includes('@')) {
      alert('Por favor, insira um e-mail válido.');
 return;
    }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    navigation.replace('Home');
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      alert('Usuário não encontrado. Por favor, registre-se.');
    } else {
      console.log('Erro ao fazer login:', error.message);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Craque da Galera</Text>
      <TextInput
 label="E-mail"
 value={email}
 onChangeText={setEmail}
        keyboardType="email-address"
 style={styles.input}
 />
      <TextInput
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />
 <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Entrar
      </Button>
      <Button onPress={() => navigation.navigate('Cadastro')}>Criar conta</Button>
    </View>
 );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1d',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#2e2e2e',
  },
  button: {
    backgroundColor: '#438fab',
    marginBottom: 8,
  },
});
