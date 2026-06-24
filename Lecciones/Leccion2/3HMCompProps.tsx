import { StyleSheet, Text, View } from 'react-native';

const App : React.FC = () => {
  return (
    <View style={styles.container}>
      <TextComponent nombre="Juan" edad={25}></TextComponent>
    </View>
  );
};

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

export default App;