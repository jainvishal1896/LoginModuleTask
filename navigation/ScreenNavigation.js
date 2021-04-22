import React from "react";
import {} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/HomeScreen";
import SignUp from "../screens/SignUp";
import LogIn from "../screens/LogIn";
const Stack = createStackNavigator();

export const StackNavigation = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Sign UP" component={SignUp} />
			<Stack.Screen name="Sign In" component={LogIn} />
		</Stack.Navigator>
	);
};
