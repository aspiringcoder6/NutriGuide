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
import { useState } from "react";
import { auth } from "../../../firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
export default function AskScreen7({ navigation }) {
  const user = auth.currentUser;
  const [userData, setUserData] = useState(false);
  const color1 = useRef(new Animated.Value(0.6)).current;
  const color2 = useRef(new Animated.Value(0.6)).current;
  const color3 = useRef(new Animated.Value(0.6)).current;
  const color4 = useRef(new Animated.Value(0.6)).current;
  const getUserData = async () => {
    const userSnapShot = await getDoc(doc(db, "users", user.uid));
    setUserData(userSnapShot.data());
  };
  useEffect(() => {
    getUserData();
  }, []);

  const Press1 = async () => {
    Animated.timing(color1, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      rate: 1,
      change: 0,
    });
    setTimeout(() => {
      navigation.navigate("Askscreen8");
    }, 300);
  };
  const Press2 = async () => {
    Animated.timing(color2, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      rate: userData.goal == "Increase Weight" ? 1.1 : 0.9,
      change: 0.25,
    });
    setTimeout(() => {
      navigation.navigate("Askscreen8");
    }, 300);
  };
  const Press3 = async () => {
    Animated.timing(color3, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      rate: userData.goal == "Increase Weight" ? 1.21 : 0.79,
      change: 0.5,
    });
    setTimeout(() => {
      navigation.navigate("Askscreen8");
    }, 300);
  };
  const Press4 = async () => {
    Animated.timing(color4, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      rate: userData.goal == "Increase Weight" ? 1.41 : 0.59,
      change: 1,
    });
    setTimeout(() => {
      navigation.navigate("Askscreen8");
    }, 300);
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
              setChange(true);
            }}
          />
          <View style={styles.dots}>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
            <View style={styles.dot}></View>
          </View>
          <Text style={styles.header}>Desired rate of change:</Text>
          {userData.goal == "Get In Shape" ||
          userData.goal == "Improve Health" ? (
            <Animated.View
              style={[styles.choiceContainer, { opacity: color1 }]}
            >
              <TouchableOpacity style={[styles.choice]} onPress={Press1}>
                <Text style={styles.choiceText}>Same</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : null}
          <Animated.View style={[styles.choiceContainer, { opacity: color2 }]}>
            <TouchableOpacity style={[styles.choice]} onPress={Press2}>
              <Text style={styles.choiceText}>0.25kg/week</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.choiceContainer, { opacity: color3 }]}>
            <TouchableOpacity style={[styles.choice]} onPress={Press3}>
              <Text style={styles.choiceText}>0.5kg/week</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.choiceContainer, { opacity: color4 }]}>
            <TouchableOpacity style={[styles.choice]} onPress={Press4}>
              <Text style={styles.choiceText}>1kg/week</Text>
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
      </View>
    )
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
    marginTop: 37,
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
    textAlign: "center",
  },
  choiceText: {
    color: "white",
    fontFamily: "Montserrat_medium",
    fontSize: 16,
    textAlign: "center",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
});
