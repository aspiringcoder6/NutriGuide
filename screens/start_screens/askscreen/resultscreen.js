import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { MyContext } from "../../../myContext";
import { useContext } from "react";
import { auth, db } from "../../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
export default function ResultScreen({ navigation }) {
  const context = useContext(MyContext);
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
    });
  }, []);
  return (
    userData && (
      <View style={styles.container}>
        <Image
          source={require("../../../assets/food.png")}
          style={{ position: "absolute", top: 0 }}
        />
        <Text style={styles.header}>Your Diet Plan have been created!</Text>
        <Text style={styles.calories}>
          Daily Calories:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.calories} kcal/day
          </Text>
        </Text>
        <Text style={styles.calories}>
          Daily Carbs:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.carbs}g/day
          </Text>
        </Text>
        <Text style={styles.calories}>
          Daily Proteins:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.proteins}g/day
          </Text>
        </Text>
        <Text style={styles.calories}>
          Daily Fats:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.fats}g/day
          </Text>
        </Text>
        <Text style={styles.calories}>
          Daily Water:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.water} l/day
          </Text>
        </Text>
        <Text style={styles.expected}>
          Time to achive goal:
          <Text style={{ fontFamily: "Montserrat_light" }}>
            {userData.time} week(s)
          </Text>
        </Text>
        <Text style={styles.endline}>
          Let's start your new lifestyle today with NutriGuide!
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            navigation.navigate("mainAppScreen");
          }}
        >
          <Text style={{ color: "white", fontFamily: "Montserrat" }}>
            Start
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    color: "#0047D7",
    fontFamily: "Montserrat",
    fontSize: 20,
    lineHeight: 30,
    alignSelf: "center",
    textAlign: "center",
  },
  graph: {
    marginTop: 63,
  },
  start: {
    position: "absolute",
    zIndex: 10,
    bottom: 245,
    left: 64,
  },
  end: {
    position: "absolute",
    zIndex: 10,
    right: 56,
    top: 296,
  },
  starttag: {
    position: "absolute",
    bottom: 270,
    left: 45,
    backgroundColor: "#C2C2C2",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3.5,
    paddingBottom: 3.5,
    borderRadius: 6,
  },
  endtag: {
    position: "absolute",
    bottom: 372,
    right: 40,
    backgroundColor: "#C2C2C2",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 3.5,
    paddingBottom: 3.5,
    borderRadius: 6,
  },
  startDate: {
    position: "absolute",
    bottom: 220,
    left: 42,
    fontFamily: "Poppins",
  },
  endDate: {
    position: "absolute",
    bottom: 220,
    right: 42,
    fontFamily: "Poppins",
  },
  calories: {
    marginTop: 20,
    fontFamily: "Montserrat",
    fontSize: 17,
    marginLeft: 20,
    textAlign: "left",
  },
  expected: {
    fontFamily: "Montserrat",
    fontSize: 17,
    marginLeft: 20,
    marginTop: 10,
    textAlign: "left",
  },
  endline: {
    textAlign: "center",
    width: "80%",
    marginTop: 56,
    alignSelf: "center",
    fontSize: 14,
  },
  startButton: {
    width: 315,
    height: 60,
    backgroundColor: "#4B6AB9",
    borderRadius: 99,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
