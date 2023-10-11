import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import "react-native-url-polyfill/auto";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MyContext } from "../../../myContext";
import { useContext } from "react";
import { auth, db } from "../../../firebase";
import { getDoc, updateDoc, doc } from "firebase/firestore";

export default function SeeResultScreen({ navigation }) {
  const context = useContext(MyContext);
  const user = auth.currentUser;
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat-Black.ttf"),
    Montserrat_medium: require("../../../assets/fonts/Montserrat-Medium.ttf"),
    Poppins: require("../../../assets/fonts/Poppins-Black.ttf"),
  });
  const [userData, setUserData] = useState(null);
  const getUserData = async () => {
    const userSnapShot = await getDoc(doc(db, "users", user.uid));
    setUserData(userSnapShot.data());
  };
  useEffect(() => {
    getUserData();
  }, []);
  if (!loaded) {
    return null;
  }
  const handleSend = async () => {
    const calories = Math.round(
      userData.gender == "Male"
        ? userData.rate *
            userData.excerciseFactor *
            (13.397 * userData.weight +
              4.799 * userData.height -
              5.677 * userData.age +
              88.632)
        : userData.rate *
            userData.excerciseFactor *
            (9.247 * userData.weight +
              3.098 * userData.height -
              4.33 * userData.age +
              447.593)
    );
    const carbs = Math.round((calories * 0.55) / 4);
    const proteins = Math.round(0.25 * calories) / 4;
    const fats = Math.round((0.2 * calories) / 9);
    const saturatedFats = Math.round(0.07 * calories);
    const time =
      userData.goal == "Get In shape" || userData.goal == "Improve Health"
        ? "Indefinietly"
        : Math.abs(userData.weight - userData.desireWeight) / userData.change;
    await updateDoc(doc(db, "users", user.uid), {
      calories: calories,
      carbs: carbs,
      proteins: proteins,
      fats: fats,
      saturatedFats: saturatedFats,
      time: time,
      water: Math.round(66 * 1.1 * 0.03 * 10) / 10,
    });
    navigation.navigate("ResultScreen");
  };
  return (
    userData && (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/girl.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={styles.arrow}
            onPress={() => {
              // setChange(true);
              navigation.goBack();
            }}
          />
          <Text style={styles.header}>Your current Profile</Text>
          <View style={styles.smallcontainer}>
            <Text style={styles.information}>
              <AntDesign
                name="user"
                size={24}
                color="gray"
                style={styles.userIcon}
              />
              Gender: {userData.gender}
            </Text>
            <Text style={styles.information}>
              <Feather name="target" size={24} color="grey" />
              Goal: {userData.goal}
            </Text>
            <Text style={styles.information}>
              <AntDesign name="clockcircleo" size={24} color="grey" /> Age:
              {userData.age}
            </Text>
            <Text style={styles.information}>
              <MaterialCommunityIcons
                name="human-male-height"
                size={24}
                color="grey"
              />{" "}
              Height:
              {userData.height} cm
            </Text>
            <Text style={styles.information}>
              <MaterialCommunityIcons name="weight" size={24} color="grey" />{" "}
              Current Weight :{userData.weight} kg
            </Text>
            <Text style={styles.information}>
              <MaterialCommunityIcons name="weight" size={24} color="grey" />{" "}
              Desired Weight :{userData.desireWeight} kg
            </Text>
            <Text style={styles.information}>
              <AntDesign name="clockcircleo" size={24} color="grey" />
              Rate of change :{userData.change}kg/tuần
            </Text>
            <Text style={styles.information}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={24}
                color="grey"
              />
              Excercise Level :{userData.exercise}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSend}>
              <Text style={styles.buttonText}>See Result</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    marginTop: 87,
    fontFamily: "Montserrat",
    color: "#3E445F",
    fontSize: 20,
  },
  button: {
    height: 60,
    width: 315,
    borderRadius: 99,
    marginTop: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B6AB9",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
  information: {
    fontSize: 18,
    fontFamily: "Montserrat_light",
    marginTop: 20,
  },
});
