import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type ResultState = 'ok' | 'invalid' | null;

function Editor({ text, onChangeText }: { text: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Editor</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Escribe aquí tu código o texto..."
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function Verificador({ result }: { result: ResultState }) {
  const message = result === 'ok' ? '✅ Test correcto' : result === 'invalid' ? '❌ Test inválido' : 'Presiona algo para verificar';

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Verificador</Text>
      <Text style={styles.resultText}>{message}</Text>
    </View>
  );
}

export default function EvaluatorScreen() {
  const [editorText, setEditorText] = useState('');
  const [testResult, setTestResult] = useState<ResultState>('invalid');

  const verifyInput = (value: string) => {
    const text = value.trim().toLowerCase();
    if (!text) {
      setTestResult('invalid');
      return;
    }

    const hasValidAnswer = text === 'ok';
    setTestResult(hasValidAnswer ? 'ok' : 'invalid');
  };

  const handleChangeText = (value: string) => {
    setEditorText(value);
    verifyInput(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Pantalla Evaluador</Text>
      <Editor text={editorText} onChangeText={handleChangeText} />
      <Verificador result={testResult} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  textArea: {
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#f8fafc',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});
