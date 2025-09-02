import { View, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const API_URL = '';
  const navigation = useNavigation();

  const handleRegister = async () => {
    
    if (!email || !password || !name || !username) {
      Alert.alert('Registration Failed', 'Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        username,
        role: 'user',
      });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error('Error registering user:', error);
      Alert.alert(
        'Registration Failed',
        'An error occurred during registration. Please try again.'
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center bg-gray-800">
      <View className="p-4">
        <Text className="mb-4 text-center text-2xl font-bold text-white">Register</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="mb-2 rounded-lg bg-white p-3 shadow-lg"
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          className="mb-2 rounded-lg bg-white p-3 shadow-lg"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          className="mb-2 rounded-lg bg-white p-3 shadow-lg"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          className="mb-2 rounded-lg bg-white p-3 shadow-lg"
          secureTextEntry
        />

        <TouchableOpacity onPress={handleRegister} className="mb-4 mt-2 rounded bg-blue-500 p-2">
          <Text className="text-center text-white">Register</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center space-x-2 gap-1">
        <Text className=" text-white">Already have an account?</Text>
        <TouchableOpacity className="" onPress={() => navigation.navigate('Login' as never)}>
          <Text className=" text-blue-500">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
