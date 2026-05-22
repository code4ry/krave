import { Text, View, StyleSheet } from "react-native";

export default function SocialScreen() {
  return (
    <View
      style={styles.container}
    >
      <Text>Social page</Text>
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