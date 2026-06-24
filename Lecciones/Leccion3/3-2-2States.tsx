import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";


const Saludo: React.FC = () => {
	const [edad, setEdad] = useState(25);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Edad: {edad}</Text>
		</View>
	);
};

export default Saludo;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#862727',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
});