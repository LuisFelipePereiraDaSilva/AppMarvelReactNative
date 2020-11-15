import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListCharacters from '../components/ListCharacters';
import DetailsCharacter from '../components/DetailsCharacter';
import DetailsComic from '../components/DetailsComic';
import DetailsSerie from '../components/DetailsSerie';
import DetailsEvent from '../components/DetailsEvent';
import DetailsStorie from '../components/DetailsStorie';
import DetailsCreator from '../components/DetailsCreator';

const Stack = createStackNavigator();

const OnboardingRoutes = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ListCharacters" component={ListCharacters} />
    <Stack.Screen name="DetailsCharacter" component={DetailsCharacter} />
    <Stack.Screen name="DetailsComic" component={DetailsComic} />
    <Stack.Screen name="DetailsSerie" component={DetailsSerie} />
    <Stack.Screen name="DetailsEvent" component={DetailsEvent} />
    <Stack.Screen name="DetailsStorie" component={DetailsStorie} />
    <Stack.Screen name="DetailsCreator" component={DetailsCreator} />
  </Stack.Navigator>
);

export default OnboardingRoutes;
