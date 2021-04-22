import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import AuthReducer from "./store/reducers/auth";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
	const [fontLoaded] = useFonts({
		"Segoe-reg": require("./assets/fonts/Segoe.ttf"),
	});

	if (!fontLoaded) {
		return <AppLoading />;
	}
	const rootReducer = combineReducers({
		auth: AuthReducer,
	});
	const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
