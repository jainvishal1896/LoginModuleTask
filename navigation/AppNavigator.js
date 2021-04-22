import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackNavigation } from "./ScreenNavigation";

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<StackNavigation />
		</NavigationContainer>
	);
};

export default AppNavigator;
