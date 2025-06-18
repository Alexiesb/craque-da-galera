// src/screens/Login.jsx
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartaoLogin}>
        <View style={styles.containerLogo}>
          <Image 
            source={require('../../assets/logo-semfundo.png')} // Substitua pelo caminho correto da sua logo
            style={styles.imagemLogo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.containerBoasVindas}>
          <Text style={styles.tituloBoasVindas}>Bem-vindo de volta!</Text>
          <Text style={styles.subtituloBoasVindas}>Entre na sua conta para continuar</Text>
        </View>

        <TextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
          outlineColor="#97c5b4"
          activeOutlineColor="#016fbe"
          textColor="#01518b"
          theme={{
            colors: {
              onSurfaceVariant: '#589e85',
              primary: '#016fbe',
            }
          }}
        />
        
        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
          mode="outlined"
          outlineColor="#97c5b4"
          activeOutlineColor="#016fbe"
          textColor="#01518b"
          theme={{
            colors: {
              onSurfaceVariant: '#589e85',
              primary: '#016fbe',
            }
          }}
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

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

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
  containerLogo: { 
    alignItems: 'center',
    marginBottom: 32,
    marginRight: 10
  },
  imagemLogo: { 
    width: 250,
    height: 80,
  },
  containerBoasVindas: { 
    alignItems: 'center',
    marginBottom: 32,
  },
  tituloBoasVindas: { 
    fontSize: 24,
    fontWeight: '600',
    color: '#01518b',
    textAlign: 'center',
    marginBottom: 8,
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
  loginButton: { 
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
  divider: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: { 
    flex: 1,
    height: 1,
    backgroundColor: '#97c5b4',
  },
  dividerText: { 
    marginHorizontal: 16,
    color: '#589e85',
    fontSize: 14,
  },
  textoBotaoCadastro: {
    fontSize: 14,
    fontWeight: '400',
  },
  cadastroNegrito: { 
    fontWeight: '700',
    color: '#016fbe', 
    textDecorationLine: 'underline'
  },
});