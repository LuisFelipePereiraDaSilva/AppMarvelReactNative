import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../components/Home/screen';
import Teste from '../components/Teste/screen';

const Stack = createStackNavigator();

const OnboardingRoutes = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Teste" component={Teste} />
  </Stack.Navigator>
);

export default OnboardingRoutes;
