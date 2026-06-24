import React from 'react'
import {View, Alert, Text, StyleSheet,Button} from 'react-native'

const PantallaPresentacion: React.FC=() => {
	return (
		<View>
			<Text style={styles.title}>Mi App</Text>
			<Text style={styles.subtitle}>Bienvenido</Text>
			<Button title="Empiezo" onPress={() => Alert.alert('¡Empezamos!')} />
		</View>
	)
}

export default PantallaPresentacion

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f7',},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 10,},
	subtitle: {
		fontSize: 16,
		marginBottom: 20,},
})