import React from 'react'
import { View, Alert, Text, StyleSheet, Button } from 'react-native'

type PantallaPresentacionProps = {
	title?: string;
	buttonTitle?: string;
}

const PantallaPresentacion: React.FC<PantallaPresentacionProps> = (props) => {
	return (
		<View>
			<Text style={styles.title}>{props.title || 'Mi App'}</Text>
			<Text style={styles.subtitle}>Bienvenido</Text>
			<Button 
        title={props.buttonTitle || 'Empiezo'} 
        onPress={() => Alert.alert('¡Empezamos!')} 
      />
		</View>
	)
}

export default PantallaPresentacion

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f7',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 20,
	},
})