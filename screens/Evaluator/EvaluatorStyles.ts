import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  containerLight: {
    backgroundColor: '#f5f5f7',
  },
  containerDark: {
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textLight: {
    color: '#111827',
  },
  textDark: {
    color: '#f3f4f6',
  },
  card: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: '#ffffff', // Fallback por defecto
  },
  cardLight: {
    backgroundColor: '#ffffff',
  },
  cardDark: {
    backgroundColor: '#374151',
  },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 50,
    fontWeight:'bold'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight:'bold',
    color: '#111827',
  },
  textArea: {
    minHeight: 160,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
    fontSize: 30,
    fontWeight:'bold'
  },
  textAreaLight: {
    borderColor: '#d1d5db',
    backgroundColor: '#f8fafc',
    color: '#111827',
  },
  textAreaDark: {
    borderColor: '#4b5563',
    backgroundColor: '#1f2937',
    color: '#f3f4f6',
  },
  resultText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusPass: {
    color: '#059669',
  },
  statusFail: {
    color: '#dc2626',
  },
  validationList: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
  },
  validationIcon: {
    fontSize: 14,
    fontWeight:'bold',
    marginRight: 8,
    width: 20,
  },
  iconPass: {
    color: '#059669',
  },
  iconFail: {
    color: '#dc2626',
  },
  validationLabel: {
    fontSize: 25,
    fontWeight:'bold',
    color: '#374151',
    flex: 1,
  },
});