import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = '';

  const handleLogin = async () => {

    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-800 ">
      <View className="p-4">
        <Text className="mb-4 text-center text-2xl font-bold text-white">Login</Text>
        <TextInput
          className="mb-2 rounded-lg bg-white p-3 shadow-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="mb-4 rounded-lg bg-white p-3 shadow-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="mb-4 rounded-lg bg-blue-500 p-3 shadow-lg"
          onPress={handleLogin}>
          <Text className="text-center text-white">Login</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center gap-1 space-x-2">
        <Text className="text-white">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
          <Text className="text-blue-500">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
