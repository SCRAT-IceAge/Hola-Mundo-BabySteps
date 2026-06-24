import { View, Text, StyleSheet } from "react-native";
import React from "react";

type Producto = {
  id: number;
	nombre: string;
	precio: number;
	descripcion: string;
}

const productos: Producto[] = [
	{
		id: 1,
		nombre: 'Producto 1',
		precio: 100,
		descripcion: 'Descripción del producto 1',
	},
	{
		id: 2,
		nombre: 'Producto 2',
		precio: 200,
		descripcion: 'Descripción del producto 2',
	},
	{
		id: 3,
		nombre: 'Producto 3',
		precio: 300,
		descripcion: 'Descripción del producto 3',
	},
]

type TarjetaProductoProps = {
	producto: Producto;
}

const TarjetaProducto: React.FC<TarjetaProductoProps> = ({ producto }) => {
	<View style={styles.card}>
		<Text style={styles.nombre}>{producto.nombre}</Text>
		<Text style={styles.descripcion}>{producto.descripcion}</Text>
		<Text style={styles.precio}>${producto.precio.toFixed(2)}</Text>
	</View>
}

export default TarjetaProducto;

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 8,
		elevation: 3,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		padding: 16,
		margin: 8,
	},
	nombre: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	descripcion: {
		fontSize: 14,
		color: 'gray',
		marginBottom: 8,
	},
	precio: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#c42727',
	},
});