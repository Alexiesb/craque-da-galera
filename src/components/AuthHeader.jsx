import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const AuthHeader = ({ title, subtitle }) => {
  return (
    <View style={styles.containerBoasVindas}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/logo-semfundo.png')}
          style={styles.imagemLogo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.tituloBoasVindas}>{title}</Text>
      <Text style={styles.subtituloBoasVindas}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AuthHeader;