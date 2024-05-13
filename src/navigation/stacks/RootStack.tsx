import * as React from "react";

import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import { MoviesDataType } from "../../types/DataTypes";

export type RootStackParamList = {
  Home: { data: MoviesDataType } | undefined;
  Details: { data: MoviesDataType | null };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: true }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
