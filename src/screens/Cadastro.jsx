import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { auth } from "../services/firebase";

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
      await createUserWithEmailAndPassword(auth, email, senha);
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartaoCadastro}>
        <View style={styles.containerLogo}>
          <Image 
            source={require('../../assets/logo-semfundo.png')}
            style={styles.imagemLogo}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.containerBoasVindas}>
          <Text style={styles.tituloBoasVindas}>Criar Nova Conta</Text>
          <Text style={styles.subtituloBoasVindas}>Preencha os dados para se cadastrar</Text>
        </View>

        <TextInput
          label="Nome Completo"
          value={nome}
          onChangeText={setNome}
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
          label="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
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

        <TextInput
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

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

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
  containerLogo: {
    alignItems: 'center',
    marginBottom: 24,
    marginRight: 10
  },
  imagemLogo: {
    width: 250,
    height: 70,
  },
  containerBoasVindas: {
    alignItems: 'center',
    marginBottom: 28,
  },
  tituloBoasVindas: {
    fontSize: 24,
    fontWeight: '700',
    color: '#01518b', 
    textAlign: 'center',
    marginBottom: 8,
  },
  subtituloBoasVindas: {
    fontSize: 16,
    color: '#589e85',
    textAlign: 'center',
    fontWeight: '400',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
    fontWeight: '500',
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