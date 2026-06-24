import { StyleSheet, Text, View } from 'react-native';

const App : React.FC = () => {
  return (
    <View style={styles.container}>
      <MyComponent />
    </View>
  );
};

const MyComponent : React.FC = () => {
  return (
    <View>
      <Text style={styles.textBlanco}>Hola Mundo</Text>
      <Text style={styles.textAmarillo}>Bienvenidos a mi primera app</Text>
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