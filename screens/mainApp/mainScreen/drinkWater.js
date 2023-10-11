import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Animated } from "react-native";
import { useEffect } from "react";
import { useRef } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { waterActions } from "../../../store/waterStore";

export default function WaterScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const currentWater = useSelector((state) => state.water.currentWater);
  const [userData, setUserData] = useState(null);
  const [messageColor, setMessageColor] = useState("rgb(143, 204, 232)");
  const [message, setMessage] = useState("");
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
    });
  }, []);
  useEffect(() => {
    if (userData) {
      var initial;
      if (currentWater < userData.water) {
        setMessage("Continue to drink!");
      } else if (
        currentWater == userData.water ||
        (currentWater < userData.water + userData.water / 10 &&
          currentWater > userData.water)
      ) {
        initial = "You have drink enough water !";
      } else {
        initial = "You are drinking too much water!";
      }
      setMessage(initial);
      if (
        currentWater == userData.water ||
        (currentWater < userData.water + userData.water / 10 &&
          currentWater > userData.water)
      ) {
        Animated.timing(changeColor, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }).start();
          setMessage("You have drink enough water !");
          setMessageColor("rgb(31, 253, 122)");
        }, 1500);
      }
    }
  }, [currentWater, userData]);
  const changeColor = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorInterpolation = changeColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(143, 204, 232)", "rgb(31, 253, 122)"],
  });
  const [pressed1, setPressed1] = useState(false);
  const [pressed2, setPressed2] = useState(false);
  const [pressed3, setPressed3] = useState(false);
  const [pressed4, setPressed4] = useState(false);
  const drink = () => {
    if (pressed1) {
      dispatch(waterActions.drinkWater(0.1));
    }
    if (pressed2) {
      dispatch(waterActions.drinkWater(0.25));
    }
    if (pressed3) {
      dispatch(waterActions.drinkWater(0.5));
    }
    if (pressed4) {
      dispatch(waterActions.drinkWater(1));
    }
  };
  if (userData) {
    return (
      <SafeAreaView style={styles.container}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          style={styles.arrow}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.header}>
          You have drink {currentWater} liter(s) of water
        </Text>
        <Animated.Text
          style={[
            styles.message,
            {
              color: messageColor,
              opacity: fadeAnim,
            },
          ]}
        >
          {message}
        </Animated.Text>
        <Progress.Circle
          size={268}
          indeterminate={false}
          progress={currentWater / userData.water}
          color={colorInterpolation}
          unfilledColor="#E3F7FB"
          thickness={28}
          borderWidth={0}
          style={{ marginTop: 32 }}
        />
        <Text style={styles.innerCircleMessage}>
          {currentWater * 1000} ml/{userData.water * 1000} ml
          <Text
            style={{ fontSize: 36, color: "#0047D7", fontFamily: "Montserrat" }}
          >
            {"\n"}
            {currentWater > userData.water
              ? 0
              : Math.round((userData.water - currentWater) * 10) * 100}
            <Text style={{ fontSize: 24 }}>ml</Text>
            <Text style={{ fontFamily: "Montserrat_light", fontSize: 14 }}>
              {"\n"} Needed
            </Text>
          </Text>
        </Text>
        <View style={styles.choices}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: pressed1 ? "#8FCCE8" : "white" },
            ]}
            onPress={() => {
              setPressed1(!pressed1);
              setPressed2(false);
              setPressed3(false);
              setPressed4(false);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: !pressed1 ? "#8FCCE8" : "white" },
              ]}
            >
              100ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: pressed2 ? "#8FCCE8" : "white" },
            ]}
            onPress={() => {
              setPressed2(!pressed2);
              setPressed1(false);
              setPressed3(false);
              setPressed4(false);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: !pressed2 ? "#8FCCE8" : "white" },
              ]}
            >
              250ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: pressed3 ? "#8FCCE8" : "white" },
            ]}
            onPress={() => {
              setPressed3(!pressed3);
              setPressed2(false);
              setPressed1(false);
              setPressed4(false);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: !pressed3 ? "#8FCCE8" : "white" },
              ]}
            >
              500ml
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: pressed4 ? "#8FCCE8" : "white" },
            ]}
            onPress={() => {
              setPressed4(!pressed4);
              setPressed2(false);
              setPressed3(false);
              setPressed1(false);
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: !pressed4 ? "#8FCCE8" : "white" },
              ]}
            >
              1 lít
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#cbcbcb", marginTop: 10 }}>
          *One cup of water often has 250ml
        </Text>
        <TouchableOpacity style={styles.drinkButton} onPress={drink}>
          <Text style={styles.drinkText}>Drink Water</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },
  arrow: {
    position: "absolute",
    top: 30,
    left: 20,
    fontSize: 40,
    color: "#4E4B66",
  },
  header: {
    marginTop: 68,
    fontFamily: "Montserrat_light",
    fontSize: 16,
  },
  message: {
    marginTop: 10,
    fontFamily: "Montserrat",
    fontSize: 16,
  },
  innerCircleMessage: {
    position: "absolute",
    textAlign: "center",
    top: 265,
    color: "#8FCCE8",
    fontFamily: "Montserrat_light",
    fontSize: 14,
  },
  choices: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
  },
  button: {
    width: 65,
    display: "flex",
    alignItems: "center",
    marginLeft: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#8FCCE8",
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: "Montserrat_light",
  },
  drinkButton: {
    paddingVertical: 14,
    paddingHorizontal: 88,
    backgroundColor: "#0047D7",
    borderRadius: 11,
    marginTop: 30,
  },
  drinkText: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 16,
  },
});
