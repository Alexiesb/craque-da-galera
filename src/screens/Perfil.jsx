import * as ImagePicker from 'expo-image-picker';
import { get, ref, update } from 'firebase/database'; 
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import PerfilCard from '../components/PerfilCard';
import { auth, db, fazerLogout } from '../services/firebase';
import { useNavigation } from '@react-navigation/native';


console.log("Instância de db em Perfil.jsx:", db);
console.log("URL do banco de dados:", db?.app?.options?.databaseURL);




export default function Perfil() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingPhoto, setUpdatingPhoto] = useState(false);

  const handleLogout = async () => {
    try {
      await fazerLogout(); 
      navigation.replace('Login'); 
    } catch (error) {
      Alert.alert('Erro ao fazer logout.');
    }
  };


  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    if (db) {
      try {
        const snapshot = await get(ref(db, 'users/' + user.uid));
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setUserData(null);
          console.log('Dados do usuário não encontrados no Realtime Database.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        Alert.alert('Erro ao carregar dados do perfil');
      } finally {
        setLoading(false);
      }
    } else {
        setUserData(null);
        console.log('Dados do usuário não encontrados no Realtime Database.');
      setLoading(false);
    }
  };

  const escolherNovaFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      try {
        setUpdatingPhoto(true);
        const user = auth.currentUser;
        if (user && db) { 
          const userRef = ref(db, 'users/' + user.uid);
          await update(userRef, { foto: resultado.assets[0].uri });
         
          setUserData((prev) => ({ ...prev, foto: resultado.assets[0].uri }));
        } else {
           Alert.alert("Erro: Não foi possível atualizar a foto. Usuário ou DB indefinido.");
          setUserData((prev) => ({ ...prev, foto: resultado.assets[0].uri }));
        }
      } catch (error) {
        Alert.alert('Erro ao atualizar a foto');
      } finally {
        setUpdatingPhoto(false);
      }
    }
  };

  const handleSaveEdit = async (dataAtualizada) => {
    try {
      const user = auth.currentUser;
      if (user && db) { 
        const userRef = ref(db, 'users/' + user.uid);
        await update(userRef, dataAtualizada);
  
        setUserData((prev) => ({ ...prev, ...dataAtualizada }));
      } else {
         Alert.alert("Erro: Não foi possível salvar os dados. Usuário ou DB indefinido.");
        setUserData((prev) => ({ ...prev, ...dataAtualizada }));
      }
    } catch (error) {
      Alert.alert('Erro ao salvar dados.');
    }
  };


  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <PerfilCard
          userData={userData}
          email={auth.currentUser?.email}
          onChangePhoto={escolherNovaFoto}
          loading={updatingPhoto}
          onSaveEdit={handleSaveEdit}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{textAlign: 'center'}}>Não foi possível carregar os dados do usuário ou os dados não existem.</Text>
           <Button mode="outlined" onPress={fetchUserData} style={{marginTop: 20}}>
             Tentar Recarregar Dados
           </Button>
        </View>
      )}
      <Button mode="contained" onPress={handleLogout} style={styles.logoutBtn}>
        Sair da Conta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f8eb',
    flex: 1,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: '#016fbe',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
