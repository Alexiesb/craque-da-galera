// src/services/firebase.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVBdWFYFE12RT-7ByiTw2Bs9UDf06-6oc",
    authDomain: "craque-da-bola.firebaseapp.com",
    projectId: "craque-da-bola",
    storageBucket: "craque-da-bola.firebasestorage.app",
    messagingSenderId: "235680073295",
    appId: "1:235680073295:web:661cb783340ae170130c3a"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
