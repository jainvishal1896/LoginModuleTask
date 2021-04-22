import React, { useState, useReducer, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
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

import Color from "../constants/Color";
import * as authActions from "../store/actions/auth";

const window = Dimensions.get("window");

export const SIGNUP = "SIGNUP";

const formReducer = (state, action) => {
	switch (action.type) {
		case SIGNUP:
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

const SignUp = (props) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			name: "",
			email: "",
			password: "",
			confirm_password: "",
		},
	});

	const inputChangeHandler = (text, inputIdentifier) => {
		dispatchFormState({
			type: SIGNUP,
			value: text,
			input: inputIdentifier,
		});
	};

	const AuthHandler = async () => {
		//setSelectedButton('btn1')
		let action = authActions.signup(
			formState.inputValues.name,
			formState.inputValues.email,
			formState.inputValues.password,
			formState.inputValues.confirm_password
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

	const [selectedButton, setSelectedButton] = useState(null);

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

	return (
		<View style={{ flex: 1, backgroundColor: Color.primary }}>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableOpacity
					style={styles.arrowButton}
					onPress={() => props.navigation.goBack()}
				>
					<Ionicons
						name={
							Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
						}
						size={wp("12%")}
						color="black"
					/>
				</TouchableOpacity>
				<View style={styles.textContainer}>
					<Text style={styles.MainText}>Sign Up</Text>
				</View>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View style={styles.InputContainer}>
						<Ionicons
							name={
								Platform.OS === "android"
									? "md-person-outline"
									: "ios-person-outline"
							}
							color="grey"
							size={wp("8%")}
							style={{ marginLeft: wp("5%") }}
						/>
						<TextInput
							style={styles.inputStyle}
							autoCorrect={false}
							placeholder="Name"
							value={formState.name}
							onChangeText={(text) => inputChangeHandler(text, "name")}
						/>
					</View>
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
				</View>

				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View style={styles.InputContainer}>
						<Ionicons
							name={
								Platform.OS === "android"
									? "md-lock-closed-outline"
									: "ios-lock-closed-outline"
							}
							color="grey"
							size={wp("8%")}
							style={{ marginLeft: wp("5%") }}
						/>
						<TextInput
							style={styles.inputStyle}
							autoCorrect={false}
							secureTextEntry
							placeholder=" Confirm Password"
							value={formState.confirm_password}
							onChangeText={(text) =>
								inputChangeHandler(text, "confirm_password")
							}
						/>
					</View>
				</View>
				<View style={{ alignItems: "center" }}>
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
									fontSize: wp("4%"),
								}}
							>
								Sign Up
							</Text>
						</TouchableOpacity>
					)}
					<View style={{ flexDirection: "row" }}>
						<Text style={{ fontFamily: "Segoe-reg", fontSize: 16 }}>
							{" "}
							Already have an account?
						</Text>
						<TouchableOpacity
							onPress={() => props.navigation.navigate("Sign In")}
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
								Sign in
							</Text>
						</TouchableOpacity>
					</View>
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
	arrowButton: {
		marginLeft: wp("3%"),
		marginTop: hp("7%"),
	},

	MainText: {
		fontFamily: "Segoe-reg",
		fontSize: wp("8.5%"),
		fontWeight: "bold",
		marginTop: wp("15%"),
		marginLeft: wp("5%"),
	},
	InputContainer: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "grey",
		padding: 10,
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
});

export default SignUp;
