import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AuthHeader from '../components/AuthHeader';
import DividerWithText from '../components/DividerWithText';
import ThemedTextInput from '../components/ThemedTextInput';
import { auth, salvarDadosUsuario } from '../services/firebase'; // Importe salvarDadosUsuario

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !telefone || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;
  
      // Salvar dados adicionais no Realtime Database
      await salvarDadosUsuario(uid, { nome: nome, telefone: telefone, foto: '' });

  
      navigation.replace('Home'); // ou para onde quiser redirecionar após cadastro
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartaoCadastro}>
        <AuthHeader
 title="Criar Nova Conta"
 subtitle="Preencha os dados para se cadastrar"
 />

 <ThemedTextInput
          label="Nome Completo"
          value={nome}
          onChangeText={setNome}
        />

 <ThemedTextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

 <ThemedTextInput
          label="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

 <ThemedTextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

 <ThemedTextInput
          label="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
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
          onPress={handleCadastro} 
          style={styles.botaoCadastro}
          buttonColor="#01518b"
          textColor="#ffffff"
          labelStyle={styles.textoBotaoCadastro}
        >
          CADASTRAR
        </Button>

 <DividerWithText text="ou" />

        <Button 
          mode="text" 
          onPress={() => navigation.goBack()}
          textColor="#016fbe"
          labelStyle={styles.textoBotaoVoltar}
          style={styles.botaoVoltar}
        >
          Já tem uma conta? <Text style={styles.voltarNegrito}>Fazer login</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#76b39d',
    padding: 20,
  },
  cartaoCadastro: {
    backgroundColor: '#f9f8eb', 
    borderRadius: 20,
    padding: 40,
    elevation: 10,
    shadowColor: '#01518b',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    borderWidth: 1,
    borderColor: '#97c5b4',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  signupButton: {
    marginBottom: 24,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#01518b',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  textoBotaoCadastro: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  botaoVoltar: {
    paddingVertical: 4,
  },
  textoBotaoVoltar: {
    fontSize: 14,
    fontWeight: '400',
  },
  voltarNegrito: {
    fontWeight: '700',
    color: '#016fbe', 
    textDecorationLine: 'underline',
  },
});