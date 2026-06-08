import { Text, View, StyleSheet } from "react-native";

export default function SavedScreen() {
  return (
    <View
      style={styles.container}
    >
      <Text>Saved page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAEFA"
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});