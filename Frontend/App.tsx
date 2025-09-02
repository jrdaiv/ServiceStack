import './global.css';
import AdminDashboardScreen from 'screens/AdminDashboardScreen';
import BookingScreen from 'screens/BookingScreen';
import LoginScreen from 'screens/LoginScreen';
import MessaginScreen from 'screens/MessaginScreen';
import ProfileScreen from 'screens/ProfileScreen';
import QRCodeScreen from 'screens/QRCodeScreen';
import RegisterScreen from 'screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "Home" : "Login"}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="QRCode" component={QRCodeScreen} />
          <Stack.Screen name="Booking" component={BookingScreen} />
          <Stack.Screen name="Messaging" component={MessaginScreen} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
