import { View, Text, StyleSheet } from 'react-native';

type TextComponentProps = {
  nombre?: string;
  edad?: number;
};

const TextComponent : React.FC<TextComponentProps> = (props) => {
  return (
    <View>
      <Text style={styles.textBlanco}>Bienvenido {props.nombre}</Text>
      <Text style={styles.textAmarillo}>Tenes {props.edad} años</Text>
    </View>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c42727',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlanco: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textAmarillo: {
    color: '#d3dc20',
    fontSize: 24,
    fontWeight: 'bold',
  },
});