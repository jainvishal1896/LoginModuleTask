import React, { useState, useReducer, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TextInput,
	Dimensions,
	ActivityIndicator,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import * as authActions from "../store/actions/auth";
import Color from "../constants/Color";

const window = Dimensions.get("window");

export const LOGIN = "LOGIN";

const formReducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			const updatedValues = {
				...state.inputValues,
				[action.input]: action.value,
			};
			return {
				inputValues: updatedValues,
			};
	}
	return state;
};

const LogIn = (props) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: "",
			password: "",
		},
	});

	const inputChangeHandler = (text, inputIdentifier) => {
		dispatchFormState({
			type: LOGIN,
			value: text,
			input: inputIdentifier,
		});
	};

	const AuthHandler = async () => {
		//setSelectedButton('btn1')
		let action = authActions.login(
			formState.inputValues.email,
			formState.inputValues.password
		);

		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			props.navigation.navigate("Sign In");
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			Alert.alert("You got ERROR", error, [
				{
					text: "Okay",
					style: "destructive",
				},
			]);
		}
	}, [error]);

	const [selectedButton, setSelectedButton] = useState(null);

	return (
		<View style={{ flex: 1, backgroundColor: Color.primary }}>
			<KeyboardAvoidingView
				//style={styles.screen}
				behavior="position"
				keyboardVerticalOffset={40}
			>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={require("../assets/appimage.png")}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontFamily: "Segoe-reg",
							fontSize: wp("8%"),
							fontWeight: "bold",
						}}
					>
						Welcome to
					</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("Sign In")}
					>
						<Text
							style={{
								color: Color.accent,
								fontFamily: "Segoe-reg",
								fontSize: wp("8%"),
								fontWeight: "bold",
							}}
						>
							{" "}
							umbrella
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.SecTextContainer}>
					<Text style={styles.SecText}>
						A simple chat platform for everyday use
					</Text>
				</View>

				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View style={styles.InputContainer}>
						<Ionicons
							name={
								Platform.OS === "android"
									? "md-mail-outline"
									: "ios-mail-outline"
							}
							color="grey"
							size={wp("8%")}
							style={{ marginLeft: wp("5%") }}
						/>
						<TextInput
							style={styles.inputStyle}
							autoCorrect={false}
							placeholder="Email address"
							value={formState.email}
							onChangeText={(text) => inputChangeHandler(text, "email")}
						/>
					</View>
				</View>

				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View style={styles.InputContainer}>
						<Ionicons
							name={
								Platform.OS === "android"
									? "md-lock-open-outline"
									: "ios-lock-open-outline"
							}
							color="grey"
							size={wp("8%")}
							style={{ marginLeft: wp("5%") }}
						/>
						<TextInput
							style={styles.inputStyle}
							autoCorrect={false}
							secureTextEntry
							placeholder="Password"
							value={formState.password}
							onChangeText={(text) => inputChangeHandler(text, "password")}
						/>
					</View>

					{isLoading ? (
						<ActivityIndicator size="small" color={Color.accent} />
					) : (
						<TouchableOpacity
							style={{
								...styles.button,
								backgroundColor:
									selectedButton === "btn1" ? Color.accent : "white",
								borderColor:
									selectedButton === "btn1" ? Color.primary : Color.accent,
							}}
							onPress={AuthHandler}
						>
							<Text
								style={{
									color: selectedButton === "btn1" ? "white" : Color.accent,
									fontSize: wp("5%"),
								}}
							>
								Sign In
							</Text>
						</TouchableOpacity>
					)}
					<Text
						style={{
							color: "grey",
							fontFamily: "Segoe-reg",
							fontSize: wp("5%"),
						}}
					>
						Or connect using
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<View
							style={{ ...styles.buttonContainer, backgroundColor: "indigo" }}
						>
							<Ionicons
								name={
									Platform.OS === "android"
										? "md-logo-facebook"
										: "ios-logo-facebook"
								}
								color="white"
								size={wp("8%")}
								style={{ marginLeft: wp("5%") }}
							/>
							<Text style={{ ...styles.inputStyle, color: "white" }}>
								Facebook
							</Text>
						</View>
					</View>

					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<View
							style={{ ...styles.buttonContainer, backgroundColor: "tomato" }}
						>
							<Ionicons
								name={
									Platform.OS === "android"
										? "md-logo-google"
										: "ios-logo-google"
								}
								color="white"
								size={wp("8%")}
								style={{ marginLeft: wp("5%") }}
							/>
							<Text style={{ ...styles.inputStyle, color: "white" }}>
								Google
							</Text>
						</View>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						marginTop: wp("5%"),
					}}
				>
					<Text style={{ fontFamily: "Segoe-reg", fontSize: 16 }}>
						{" "}
						Don't have an account?
					</Text>
					<TouchableOpacity
						onPress={() => props.navigation.navigate("Sign UP")}
					>
						<Text
							style={{
								color: Color.accent,
								fontFamily: "Segoe-reg",
								fontSize: 15,
								fontWeight: "bold",
							}}
						>
							{" "}
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Color.primary,
	},
	image: {
		width: wp("60%"),
		height: hp("30%"),
	},
	imageContainer: {
		alignItems: "center",
		marginTop: hp("6%"),
	},
	SecTextContainer: {
		width: wp("85%"),
	},
	SecText: {
		fontFamily: "Segoe-reg",
		fontSize: wp("4.7%"),
		padding: wp("2%"),
		marginLeft: wp("10%"),
		marginTop: wp("3%"),
		color: "grey",
	},
	InputContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "grey",
		padding: 6,
		width: wp("90%"),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
		backgroundColor: "#fff",
		marginTop: wp("5%"),
		elevation: 20,
	},
	inputStyle: {
		padding: wp("2.5%"),
		fontSize: wp("4.5%"),
		width: wp("80%"),
		marginLeft: wp("0.5%"),
	},
	button: {
		borderWidth: 2,
		width: wp("85%"),
		height: wp("13%"),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: wp("20%"),
		marginVertical: wp("6%"),
		marginLeft: wp("1.2%"),
	},
	buttonContainer: {
		width: wp("40%"),
		flexDirection: "row",
		alignItems: "center",
		marginTop: 5,
		//borderWidth: 1,
		borderRadius: 15,
	},
});

export default LogIn;
