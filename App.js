import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	Text,
	StatusBar,
	LogBox
} from 'react-native';
import { decode, encode } from 'base-64'
import firebase from './src/utils/firebase'
import 'firebase/auth'
import Auth from './screens/Auth';
import Birthdays from './screens/Birthdays';

LogBox.ignoreLogs(["Setting a timer"]);

if (!global.btoa) global.btoa = encode
if (!global.atob) global.atob = decode

const App = () => {
	const [user, setUser] = useState(undefined)
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
			setUser(usr);
		})
		return () => unsubscribe()
	}, [])

	if (user === undefined) return <Text>Waiting</Text>

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor='#15212b'/>
			<SafeAreaView style={styles.ViewBg}>
				<View style={styles.scroll}>
					{user ?
						<Birthdays user={user} />
						:
						<Auth />
					}
				</View>
			</SafeAreaView>
		</>
	);
};


const styles = StyleSheet.create({
	ViewBg: {
		backgroundColor: '#15212b',
		height: '100%',
		flex: 1

	},
	scroll: {
		marginHorizontal: '4%',
		flexGrow: 1,

	}
});

export default App;
