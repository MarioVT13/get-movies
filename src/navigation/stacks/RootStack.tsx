import * as React from "react";

import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import MainScreen from "../../screens/MainScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import { DataType } from "../../types/DataTypes";

export type RootStackParamList = {
  Main: { data?: DataType } | undefined;
  Details: { data: DataType | null };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
