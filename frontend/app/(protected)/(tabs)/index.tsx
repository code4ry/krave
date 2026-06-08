import { Text, View, StyleSheet } from 'react-native';

// \(protected)\(tabs)\index.tsx

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#5A403C',
    fontFamily: 'Inter_700Bold',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
