import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, StyleSheet } from 'react-native';

const stack = createNativeStackNavigator();

import Welcome from '../screens/welcome/Welcome';
import Register from '../screens/(auth)/register/Register';
import Login from '../screens/(auth)/login/Login';
import TabNavigator from './TabNavigator';
import { getData } from '../utils/storage';
import Project from '../screens/(auth)/register/Project';
import FinishRegister from '../screens/(auth)/register/Finish';

const SplashImage = () => (
  <View style={styles.container}>
    <Image source={require('../../assets/splash.png')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await getData("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <SplashImage />;
  }
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName={isLoggedIn ? 'main' : 'login'} screenOptions={{ headerShown: false }}>
            <stack.Screen name="main" component={TabNavigator} />
            <stack.Screen name="welcome" component={Welcome} />
            <stack.Screen name='register' component={Register} />
            <stack.Screen name='project' component={Project} />
            <stack.Screen name='finish' component={FinishRegister} />
            <stack.Screen name='login' component={Login} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;