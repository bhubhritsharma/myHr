import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CategoriesScreen" component={CategoriesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
