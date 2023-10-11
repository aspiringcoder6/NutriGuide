import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useFonts } from "expo-font";
import * as Progress from "react-native-progress";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Animated } from "react-native";
import { useEffect } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import WaterCup from "./WaterCup";
import Meal from "./Meal";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Modal } from "react-native";
import { calculateTotalNutrition } from "../../../store/utils";
import { nutrientActions } from "../../../store/waterStore";
import Diet from "../Diet";
import { useIsFocused } from "@react-navigation/native";
export default function Homescreen({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const currentWater = useSelector((state) => {
    return state.water.currentWater;
  });
  const currentNutritions = useSelector((state) => {
    return state.nutritions;
  });
  const totalNutrition = calculateTotalNutrition(currentNutritions);
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
      console.log(res.data());
    });
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    const menuDocRef = doc(db, "users", user.uid, "menus", formattedDate);
    const defaultState = {
      foods: [],
      totalCalories: 0,
      totalCarbs: 0,
      totalProteins: 0,
      totalFats: 0,
    };
    getDoc(menuDocRef).then((res) => {
      if (res.data()) {
        dispatch(
          nutrientActions.updateDay({
            breakfast: res.data().breakfast
              ? res.data().breakfast.mealData
              : defaultState,
            lunch: res.data().lunch ? res.data().lunch.mealData : defaultState,
            snacks: res.data().snacks
              ? res.data().snacks.mealData
              : defaultState,
            dinner: res.data().dinner
              ? res.data().dinner.mealData
              : defaultState,
          })
        );
      }
    });
  }, [isFocused]);

  const [showInfo, setShowInfo] = useState(false);
  const [loaded] = useFonts({
    Montserrat: require("../../../assets/fonts/Montserrat-Black.ttf"),
    Montserrat_light: require("../../../assets/fonts/Montserrat-Light.ttf"),
    Poppins: require("../../../assets/fonts/Poppins-Black.ttf"),
    Montserrat_medium: require("../../../assets/fonts/Montserrat-Medium.ttf"),
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handlePress = () => {
    setShowInfo(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowInfo(false);
      });
    }, 3000);
  };
  if (!loaded) {
    return null;
  }
  const DrinkWater = () => {
    navigation.navigate("WaterScreen");
  };
  if (!userData) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    var BMI =
      Math.round(
        (userData.weight * 10) / ((userData.height * userData.height) / 10000)
      ) / 10;
    var neededWater = userData.water;
    var currentCalories = totalNutrition.totalCalories;
    var currentCarbs = totalNutrition.totalCarbs;
    var currentProteins = totalNutrition.totalProteins;
    var currentFats = totalNutrition.totalFats;
    var bCalories = currentNutritions.breakfast.totalCalories;
    var neededbCalories = (userData.calories * 2) / 10;
    var lCalories = currentNutritions.lunch.totalCalories;
    var neededlCalories = (userData.calories * 4) / 10;
    var dCalories = currentNutritions.dinner.totalCalories;
    var neededDCalories = (userData.calories * 3.5) / 10;
    var sCalories = currentNutritions.snacks.totalCalories;
    var neededsCalories = userData.calories / 20;
    var excerciseCalories = 0;
    var fullCups = Math.trunc((currentWater / neededWater) * 8);
    console.log(currentCalories);
    return (
      <SafeAreaView style={styles.container}>
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "rgba(75, 106, 185, 1)",
                  textAlign: "center",
                  fontFamily: "Montserrat",
                }}
              >
                Confirm
              </Text>
              <Text style={{ fontSize: 12 }}>
                Do you want to log out of this account?
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(75, 106, 185, 1)",
                    width: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 30,
                    borderRadius: 12,
                  }}
                  onPress={async () => {
                    setModalVisible(false);
                    await auth.signOut();
                    navigation.navigate("SignUp");
                  }}
                >
                  <Text
                    style={{
                      color: "rgba(75, 106, 185, 1)",
                      alignSelf: "center",
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "rgba(75, 106, 185, 1)",
                    width: 80,
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    height: 30,
                    borderRadius: 12,
                  }}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: "white", alignSelf: "center" }}>
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.container}>
          <TouchableOpacity
            style={{ marginLeft: 20, marginTop: 10 }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="logout" size={24} color="gray" />
          </TouchableOpacity>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../../assets/avatar.png")}
              style={styles.avatar}
            />
            <Text style={styles.avatarText}>
              <Text style={{ fontFamily: "Montserrat" }}>
                Hello {userData.name}!
              </Text>
              {"\n"}
              <Text style={{ fontFamily: "Montserrat_light" }}>
                Let's plan your nutrition plan for today!
              </Text>
            </Text>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.information_blue}>
              <Text style={{ color: "#0047D7" }}>
                BMI{"    "}
                <AntDesign
                  name="infocirlce"
                  size={24}
                  color="#0047D7"
                  onPress={handlePress}
                />
                {"\n"}
                <Text style={styles.bold}>{BMI}</Text>
              </Text>
            </View>
            <View style={styles.information_black}>
              <Text>
                Age{"\n"}
                <Text style={styles.bold}>{userData.age}</Text>
              </Text>
            </View>
            <View style={styles.information_blue}>
              <Text style={{ color: "#0047D7" }}>
                Weight{"\n"}
                <Text style={styles.bold}>{userData.weight}</Text>kg
              </Text>
            </View>
            <View style={styles.information_black}>
              <Text>
                Height{"\n"}
                <Text style={styles.bold}>{userData.height}</Text>cm
              </Text>
            </View>
          </View>
          {showInfo && (
            <Animated.View
              style={[
                {
                  marginTop: 20,
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
                styles.informationBox,
              ]}
            >
              <Animated.Text
                style={{
                  fontSize: 12,
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  fontFamily: "Montserrat_light",
                }}
              >
                The body mass index (BMI) is a measure that uses your height and
                weight to work out if your weight is healthy.
              </Animated.Text>
            </Animated.View>
          )}
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => {
              navigation.navigate("UpdateInfoScreen");
            }}
          >
            <Text style={styles.updateButtonText}>Update information</Text>
          </TouchableOpacity>
          <View style={styles.goalContainer}>
            <View style={styles.firstline}>
              <Text style={styles.goalText}>
                <Feather name="target" size={24} color="black" /> Your Goal
              </Text>
              <Text style={{ fontFamily: "Montserrat_light", fontSize: 12 }}>
                0/{userData.time} month
              </Text>
            </View>
            <View style={styles.goalProgress}>
              <Text style={styles.goalStart}>
                <Text
                  style={{
                    color: "#C4C4C4",
                    fontFamily: "Montserrat_light",
                    fontSize: 12,
                  }}
                >
                  Start
                </Text>
                {"\n"}
                {userData.startWeight}kg
              </Text>
              <Progress.Bar
                progress={
                  Math.abs(userData.startWeight - userData.weight) /
                  Math.abs(userData.startWeight - userData.desireWeight)
                }
                width={176}
                color="#AFF242"
                unfilledColor="#0047D7"
                style={{ borderWidth: 0 }}
              />
              <Text style={styles.goalEnd}>
                <Text
                  style={{
                    color: "#C4C4C4",
                    fontFamily: "Montserrat_light",
                    fontSize: 12,
                  }}
                >
                  Goal
                </Text>
                {"\n"}
                {userData.desireWeight}kg
              </Text>
              <Image source={require("../../../assets/todo.png")} />
            </View>
          </View>
          <View style={styles.today}>
            <Text style={{ position: "absolute", top: 150, color: "white" }}>
              {currentCalories}/{userData.calories}cal
            </Text>
            <Text
              style={{
                position: "absolute",
                top: 170,
                color: "white",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              {Math.abs(userData.calories - currentCalories)}{" "}
              <Text style={{ fontWeight: "normal" }}>Cal</Text>
            </Text>
            <Text style={{ position: "absolute", top: 210, color: "white" }}>
              {totalNutrition.totalCalories > userData.calories
                ? "over"
                : "left"}
            </Text>
            <Text style={styles.todayHeader}>Today</Text>
            <Progress.Circle
              size={168}
              indeterminate={false}
              progress={currentCalories / userData.calories}
              color="white"
              thickness={8}
              borderWidth={4}
            />
            <View style={styles.nutritions}>
              <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>
                  {Math.round(currentCarbs * 10) / 10}/{userData.carbs}g
                </Text>
                <Progress.Bar
                  progress={currentCarbs / userData.carbs}
                  width={83}
                  borderRadius={0}
                  color="white"
                />
                <Text style={styles.nutrientText}>Carbs</Text>
              </View>
              <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>
                  {Math.round(currentProteins * 10) / 10}/{userData.proteins}g
                </Text>
                <Progress.Bar
                  progress={currentProteins / userData.proteins}
                  width={83}
                  borderRadius={0}
                  color="white"
                />
                <Text style={styles.nutrientText}>Proteins</Text>
              </View>
              <View style={styles.nutrient}>
                <Text style={styles.nutrientText}>
                  {Math.round(currentFats * 10) / 10}/{userData.fats}g
                </Text>
                <Progress.Bar
                  progress={currentFats / userData.fats}
                  width={83}
                  borderRadius={0}
                  color="white"
                />
                <Text style={styles.nutrientText}>Fats</Text>
              </View>
            </View>
          </View>
          <View style={styles.water}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontFamily: "Montserrat" }}>Drink water</Text>
              <Text style={{ fontFamily: "Montserrat_light" }}>
                Required:{currentWater}/{userData.water}l
              </Text>
            </View>

            <WaterCup fullCups={fullCups} DrinkWater={DrinkWater} />
          </View>
          <Meal
            image={require("../../../assets/breakfast.png")}
            calories={bCalories}
            neededCalories={neededbCalories}
            mealName={"breakfast"}
            mealItems={currentNutritions.breakfast.foods}
          />
          <Meal
            image={require("../../../assets/lunch.png")}
            calories={lCalories}
            neededCalories={neededlCalories}
            mealName={"lunch"}
            mealItems={currentNutritions.lunch.foods}
          />
          <Meal
            image={require("../../../assets/dinner.png")}
            calories={dCalories}
            neededCalories={neededDCalories}
            mealName={"dinner"}
            mealItems={currentNutritions.dinner.foods}
          />
          <Meal
            image={require("../../../assets/snack.png")}
            calories={sCalories}
            neededCalories={neededsCalories}
            mealName={"snacks"}
            mealItems={currentNutritions.snacks.foods}
          />
          <Meal
            image={require("../../../assets/exercise.png")}
            calories={excerciseCalories}
            mealName={"excercise"}
            mealItems={[]}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
              marginTop: 20,
              alignItems: "baseline",
            }}
          >
            <FontAwesome5 name="heartbeat" size={24} color="#00113D" />
            <Text
              style={{
                marginLeft: 5,
                color: "#00113D",
                fontFamily: "Montserrat",
              }}
            >
              Recommended Diet
            </Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
            >
              <Text
                style={{ color: "#B1B1B1", fontFamily: "Montserrat_light" }}
              >
                More {">"}
              </Text>
            </TouchableOpacity>
          </View>
          <Diet
            image={require("../../../assets/protein.png")}
            dietName={"Protein Diet"}
            shortDesc={"Protein-rich diet"}
            longDesc={"Use protein-rich foods in your meal"}
            time={"7 days"}
            goal={"Increase muscle , weight loss"}
          />
          <Diet
            image={require("../../../assets/keto.png")}
            dietName={"Keto"}
            shortDesc={"Keep eating the fat off"}
            longDesc={
              "Cutting carbs, increase in fats to supplies calories for body"
            }
            time={"7 days"}
            goal={"Reduce weight, healthy"}
          />
          <Diet
            image={require("../../../assets/vegetarian.png")}
            dietName={"Vegetarian"}
            shortDesc={"Vegan diet"}
            longDesc={"Get rid of animal-orignated foods out of daily lives"}
            time={"7 days"}
            goal={"Healthy"}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 100,
  },
  avatarContainer: {
    marginTop: 26,
    width: "96%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatarText: {
    width: "70%",
    color: "#0047D7",
  },
  avatar: {
    width: 56,
    height: 56,
  },
  informationContainer: {
    display: "flex",
    width: "96%",
    alignSelf: "center",
    marginTop: 26,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  information_blue: {
    color: "#0047D7",
    width: "18%",
    borderBottomColor: "#0047D7",
    borderBottomWidth: 1,
  },
  information_black: {
    width: "18%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  bold: {
    fontFamily: "Montserrat",
    fontSize: 20,
  },
  informationBox: {
    position: "absolute",
    backgroundColor: "#e8e8e8",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    marginLeft: 80,
  },
  updateButton: {
    backgroundColor: "#0047D7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    alignSelf: "center",
    marginTop: 20,
    width: "60%",
  },
  updateButtonText: {
    color: "white",
    fontFamily: "Montserrat",
    fontSize: 16,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  goalText: {
    fontFamily: "Montserrat_light",
    fontSize: 16,
  },
  firstline: {
    width: "90%",
    marginTop: 10,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  goalProgress: {
    width: "90%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    marginTop: 10,
    paddingBottom: 15,
  },
  goalStart: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 16,
  },
  goalEnd: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#0047D7",
  },
  today: {
    marginTop: -60,
    zIndex: -1,
    backgroundColor: "#00113D",
    display: "flex",
    alignItems: "center",
    borderRadius: 50,
  },
  todayHeader: {
    color: "white",
    fontSize: 16,
    marginTop: 75,
    marginBottom: 20,
  },
  nutritions: {
    display: "flex",
    flexDirection: "row",
    width: "95%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  nutrientText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Montserrat_light",
    marginBottom: 10,
    marginTop: 10,
  },
  water: {
    backgroundColor: "#AFF242",
    width: "90%",
    alignSelf: "center",
    marginTop: 35,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    paddingBottom: 15,
  },
  diet: {
    width: "90%",
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 20,
  },
  bookMark: {
    position: "absolute",
    color: "white",
    right: 18,
    top: 10,
  },
  timeTag: {
    position: "absolute",
    backgroundColor: "#CCE9F2",
    borderRadius: 5,
    padding: 5,
    right: 18,
    bottom: 40,
  },
  goalTag: {
    position: "absolute",
    backgroundColor: "#AFF242",
    borderRadius: 5,
    padding: 5,
    right: 18,
    bottom: 15,
  },
  goalContainer: {
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: -1,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 11,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
  },
});
