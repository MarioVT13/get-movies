import * as React from "react";

import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "../../screens/DetailsScreen";
import { MovieItemDataType } from "../../types/DataTypes";
import { ContextProvider } from "../../Context";

export type RootStackParamList = {
  Home: undefined;
  Details: { data: MovieItemDataType | undefined };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <ContextProvider>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled: true }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </ContextProvider>
  );
};

export default RootStack;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
