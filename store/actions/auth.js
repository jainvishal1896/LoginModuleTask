import { Alert } from "react-native";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

let timer;

export const signup = (name, email, password, confirm_password) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQWnl5XB0M7fWtI7ixR02_WcuolwNJTDQ",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: name,
					email: email,
					password: password,
					confirm_password: confirm_password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorMessage = errorResData.error.message;
			console.log(errorResData);
			let errMessage = "Something went wrong";
			if (errorMessage === "EMAIL_EXISTS") {
				errMessage = "The Email already exists.";
			} else if (errorMessage === "OPERATION_NOT_ALLOWED") {
				errMessage = "Password sign-in is disabled for this project.";
			}
			throw new Error(errMessage);
		}
		const resData = await response.json();
		console.log(resData);
		Alert.alert(
			"New User Signed Up.",
			"Successfully Signed Up. Please Log in.",
			[{ text: "Okay", style: "destructive" }]
		);
		//dispatch({ type: SIGNUP, id: resData.data.id, name: resData.data.name });
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQWnl5XB0M7fWtI7ixR02_WcuolwNJTDQ",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);
		if (!response.ok) {
			const errorResData = await response.json();
			const errorMessage = errorResData.error.message;
			let errMessage = "Something went wrong";
			if (errorMessage === "EMAIL_NOT_FOUND") {
				errMessage = "The Email is not registered.";
			} else if (errorMessage === "INVALID_PASSWORD") {
				errMessage = "Password is Invalid.";
			} else if (errorMessage === "USER_DISABLED") {
				errMessage = "User is disabled";
			}
			throw new Error(errMessage);
		}
		const resData = await response.json();
		Alert.alert("Log In!!", "Successfully Logged in.", [
			{ text: "Okay", style: "destructive" },
		]);
		// dispatch({
		// 	type: LOGIN,
		// 	id: resData.data.id,
		// 	name: resData.data.name,
		// 	token: resData.data.token,
		// });
	};
};
