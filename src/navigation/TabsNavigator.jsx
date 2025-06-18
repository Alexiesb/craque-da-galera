// src/navigation/TabsNavigator.jsx
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Votacao from '../screens/Votacao';
import JogadoresAdmin from '../screens/JogadoresAdmin';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#438fab',
        tabBarInactiveTintColor: '#97c5b4', // Cor da aba inativa (barra inferior)
        tabBarStyle: { backgroundColor: '#76b39d' },
        headerShown: true, // Mostra o cabeçalho
        headerStyle: { backgroundColor: '#76b39d' }, // Fundo do cabeçalho (Fundo Principal)
        headerTintColor: '#01518b', // Cor dos botões e título no cabeçalho (Destaques / Botões Primários)
      }}

    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Votação"
        component={Votacao}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="how-to-vote" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Admin"
        component={JogadoresAdmin}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
