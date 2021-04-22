import React, { useCallback, useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Button,
	TouchableOpacity,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Color from "../constants/Color";
const HomeScreen = (props) => {
	const [selectedButton, setSelectedButton] = useState(null);

	const SignUpHandler = (title) => {
		setSelectedButton(title);
		props.navigation.navigate("Sign UP");
	};
	const SignInHandler = (title) => {
		setSelectedButton(title);
		props.navigation.navigate("Sign In");
	};
	return (
		<View style={styles.screen}>
			<Image source={require("../assets/logo.png")} style={styles.logo} />
			<View style={styles.textContainer}>
				<Text style={styles.MainText}>Welcome to Umbrella</Text>
			</View>
			<View style={styles.SecTextContainer}>
				<Text style={styles.SecText}>
					A simple chat platform for everyday use
				</Text>
			</View>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require("../assets/appimage.png")}
				/>
			</View>
			<View style={{ alignItems: "center" }}>
				<TouchableOpacity
					style={{
						...styles.button,
						marginTop: wp("5%"),
						backgroundColor:
							selectedButton === "Sign UP" ? Color.accent : "white",
						borderColor:
							selectedButton === "Sign UP" ? Color.primary : Color.accent,
					}}
					onPress={() => SignUpHandler("Sign UP")}
				>
					<Text
						style={{
							color: selectedButton === "Sign UP" ? "white" : Color.accent,
							fontSize: wp("4%"),
						}}
					>
						Sign Up
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						...styles.button,
						backgroundColor:
							selectedButton === "Sign In" ? Color.accent : "white",
						borderColor:
							selectedButton === "Sign In" ? Color.primary : Color.accent,
					}}
					onPress={() => SignInHandler("Sign In")}
				>
					<Text
						style={{
							color: selectedButton === "Sign In" ? "white" : Color.accent,
							fontSize: wp("4%"),
						}}
					>
						Sign in
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Color.primary,
	},
	logo: {
		width: wp("50%"),
		height: 100,
		marginTop: hp("8%"),
		marginLeft: wp("5%"),
	},
	textContainer: {
		alignItems: "center",
	},
	MainText: {
		fontFamily: "Segoe-reg",
		fontSize: wp("8.5%"),
		fontWeight: "bold",
		marginTop: wp("5%"),
	},
	SecTextContainer: {
		width: wp("75%"),
	},
	SecText: {
		fontFamily: "Segoe-reg",
		fontSize: wp("5.5%"),
		padding: wp("2%"),
		marginLeft: wp("7.5%"),
		marginTop: wp("3%"),
		color: "grey",
	},
	image: {
		width: wp("80%"),
		height: hp("40%"),
	},
	imageContainer: {
		alignItems: "center",
	},
	button: {
		borderWidth: 2,
		width: wp("85%"),
		height: wp("13%"),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: wp("20%"),
		marginVertical: wp("1.2%"),
	},
});

export default HomeScreen;
