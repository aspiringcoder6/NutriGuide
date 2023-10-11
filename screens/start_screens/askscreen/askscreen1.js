import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useFonts } from "expo-font";
import { auth, db } from "../../../firebase";
import { setDoc, doc, updateDoc } from "firebase/firestore";
export default function AskScreen1({ navigation }) {
  const user = auth.currentUser;
  const color1 = useRef(new Animated.Value(0.6)).current;
  const color2 = useRef(new Animated.Value(0.6)).current;
  const color3 = useRef(new Animated.Value(0.6)).current;
  const color4 = useRef(new Animated.Value(0.6)).current;
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
      goal: "Increase Weight",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen2");
    }, 300);
  };
  const Press2 = async () => {
    Animated.timing(color2, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      goal: "Decrease Weight",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen2");
    }, 300);
  };
  const Press3 = async () => {
    Animated.timing(color3, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      goal: "Get In Shape",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen2");
    }, 300);
  };
  const Press4 = async () => {
    Animated.timing(color4, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    await updateDoc(doc(db, "users", user.uid), {
      goal: "Improve Health",
    });
    setTimeout(() => {
      navigation.navigate("Askscreen2");
    }, 300);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/girl.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.dots}>
          <View style={[styles.dot, { backgroundColor: "#3E445F" }]}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
          <View style={styles.dot}></View>
        </View>
        <Text style={styles.header}>Your goal is:</Text>
        <Animated.View style={[styles.choiceContainer, { opacity: color1 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press1}>
            <Text style={styles.choiceText}>Gain weight</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, { opacity: color2 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press2}>
            <Text style={styles.choiceText}>Lose weight</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, { opacity: color3 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press3}>
            <Text style={styles.choiceText}>Keep in shape</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.choiceContainer, { opacity: color4 }]}>
          <TouchableOpacity style={[styles.choice]} onPress={Press4}>
            <Text style={styles.choiceText}>Reduce body fat</Text>
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
});
