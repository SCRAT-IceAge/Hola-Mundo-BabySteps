import { View,Text, StyleSheet } from "react-native";
import React from "react";


type SaludoProps = {
  nombre: string;
  edad: number;
};

const Saludo: React.FC<SaludoProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hola, {props.nombre}!</Text>
      <Text style={styles.text}>Edad: {props.edad}</Text>
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