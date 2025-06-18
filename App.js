// App.js
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { JogadoresProvider } from './src/contexts/JogadoresContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <JogadoresProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </JogadoresProvider>
  );
}

