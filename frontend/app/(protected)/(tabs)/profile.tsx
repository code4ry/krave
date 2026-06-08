import { Text, View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/utils/authContext";

export default function ProfileScreen() {
  const router = useRouter();
  const authState = useContext(AuthContext);

  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>Profile Page</Text>

      <Button title="Log out" onPress={authState.logOut}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF8FF"
  },
  text: {
    color: '#5A403C',
    fontFamily: 'Inter_900Black',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});