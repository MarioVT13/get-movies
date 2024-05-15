import * as React from "react";

import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import { MovieItemDataType } from "../../types/DataTypes";

export type RootStackParamList = {
  Home: { data: MovieItemDataType } | undefined;
  Details: { data: MovieItemDataType | null };
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
