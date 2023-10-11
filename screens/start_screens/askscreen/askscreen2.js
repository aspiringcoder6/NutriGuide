import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useFonts } from "expo-font";
export default function AskScreen2({ navigation }) {
  const user = auth.currentUser;
  const color1 = useRef(new Animated.Value(0.6)).current;
  const color2 = useRef(new Animated.Value(0.6)).current;
  const resetScreen = () => {
    navigation.dispatch(StackActions.replace("Askscreen1"));
  };

  const [change, setChange] = useState(false);
  useEffect(() => {
    if (change == true) {
      navigation.goBack();
      resetScreen();
    }
  }, [change]);
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat-Black.ttf"),
    Montserrat_medium: require("../../../assets/fonts/Montserrat-Medium.ttf"),
    Poppins: require("../../../assets/fonts/Poppins-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const Press1 = async () => {
    Animated.timing(color1, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      gender: "Male",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen3");
    }, 300);
  };
  const Press2 = async () => {
    Animated.timing(color2, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      gender: "Female",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen3");
    }, 300);
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
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>
        <Text style={styles.header}>Your gender is:</Text>
        <Animated.View style={[styles.choiceContainer, { opacity: color1 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press1}>
            <Text style={styles.choiceText}>Male</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, { opacity: color2 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press2}>
            <Text style={styles.choiceText}>Female</Text>
          </TouchableOpacity>
        </Animated.View>
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
    fontFamily: "Montserrat_medium",
    fontSize: 16,
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
});
