import React, { useRef, useEffect } from "react";
import { TextInput } from "react-native";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { updateDoc, doc } from "firebase/firestore";
import { StackActions } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
export default function AskScreen3({ navigation }) {
  const user = auth.currentUser;
  const [change, setChange] = useState(false);
  const resetScreen = () => {
    navigation.dispatch(StackActions.replace("Askscreen2"));
  };
  const [answer, setAnswer] = useState("");
  const [color, setColor] = useState("rgba(0, 0, 0, 1)");
  const [placeholder, setPlaceholder] = useState("");
  useEffect(() => {
    if (change == true) {
      navigation.goBack();
      resetScreen();
    }
  }, [change]);
  const handleNext = async () => {
    if (answer == "") {
      setPlaceholder("Please input age!");
      setColor("rgba(255, 0, 0, 1)");
    } else if (!Number.isInteger(parseInt(answer))) {
      setAnswer("Invalid Age!");
      setColor("rgba(255, 0, 0, 1)");
    } else {
      await updateDoc(doc(db, "users", user.uid), {
        age: parseInt(answer),
      });
      navigation.navigate("Askscreen4");
    }
    setTimeout(() => {
      setPlaceholder("");
      setAnswer("");
      setColor("rgba(0, 0, 0, 1)");
    }, 1000);
  };
  return (
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
            setChange(true);
          }}
        />
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
          <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
          <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>
        <Text style={styles.header}>Your age:</Text>
        <Text style={[styles.age, { color: color }]}>Years old</Text>
        <TextInput
          style={[styles.input, { color: color, borderColor: color }]}
          onChangeText={setAnswer}
          value={answer}
          placeholder={placeholder}
          placeholderTextColor={color}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    alignItems: "center",
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "#F3F3F3",
    marginLeft: 14,
  },
  dots: {
    display: "flex",
    flexDirection: "row",
    marginTop: 100,
  },
  header: {
    marginTop: 87,
    fontFamily: "Montserrat",
    color: "#3E445F",
    fontSize: 20,
  },
  choiceContainer: {
    width: 315,
    height: 60,
    marginTop: 32,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(75, 106, 185,1)",
  },
  choice: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  choiceText: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 2,
    width: 288,
    marginTop: 111,
    fontSize: 20,
    textAlign: "center",
  },
  age: {
    position: "absolute",
    top: 334,
    right: 50,
    fontSize: 20,
  },
  nextButton: {
    height: 60,
    width: 315,
    borderRadius: 99,
    marginTop: 27,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B6AB9",
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "200",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
});
