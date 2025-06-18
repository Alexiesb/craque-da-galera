// src/screens/Login.jsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AuthHeader from '../components/AuthHeader';
import DividerWithText from '../components/DividerWithText';
import ThemedTextInput from '../components/ThemedTextInput'; // Importar salvarDadosUsuario
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
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      const uid = user.uid;
      const userData = {
        email: user.email,
      };
      // await salvarDadosUsuario(uid, userData); // Assuming salvarDadosUsuario exists in firebase.js
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartaoLogin}>
        <AuthHeader
          title="Bem-vindo de volta!"
          subtitle="Entre na sua conta para continuar"
        />

        <ThemedTextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        
        <ThemedTextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <Button 
          mode="contained" 
          onPress={handleLogin} 
          style={styles.botaoLogin}
          buttonColor="#01518b"
          textColor="#ffffff"
          labelStyle={styles.textoBotaoLogin}
        >
          ENTRAR
        </Button>

        <DividerWithText text="ou" />

        <Button 
          mode="text" 
          onPress={() => navigation.navigate('Cadastro')}
          textColor="#016fbe"
          labelStyle={styles.textoBotaoCadastro}
        >
          Não tem uma conta? <Text style={styles.cadastroNegrito}>Cadastre-se aqui</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#76b39d',
    padding: 20,
    justifyContent: 'center',
  },
  cartaoLogin: { 
    backgroundColor: '#f9f8eb',
    borderRadius: 16,
    padding: 40,
    elevation: 8,
    shadowColor: '#01518b',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  subtituloBoasVindas: { 
    fontSize: 16,
    color: '#589e85',
    textAlign: 'center',
  },
  input: { 
    marginBottom: 14,
    backgroundColor: '#ffffff',
  },
  botaoLogin: { 
    marginBottom: 24,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#01518b',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textoBotaoLogin: { // 
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cadastroNegrito: { 
    fontWeight: '700',
    color: '#016fbe', 
    textDecorationLine: 'underline'
  },
});