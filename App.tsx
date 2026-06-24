/*

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EvaluatorScreen from './screens/Evaluator/EvaluatorScreen';
import { RootStackParamList } from './navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Evaluador" component={EvaluatorScreen} options={{ title: 'Evaluador' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/

import {View, StyleSheet} from 'react-native'
import PantallaPresentacionCambioBoton from './Lecciones/Leccion2/2-6-2PantallaPresentacionCambioBoton'


const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <PantallaPresentacionCambioBoton title="LALALA" buttonTitle='JFJFJFJFJFJFJJFJ'/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b1aa4c',
  },
})