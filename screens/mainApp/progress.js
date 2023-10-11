import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { auth } from "../../firebase";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { calculateTotalNutrition } from "../../store/utils";
import * as Progress from "react-native-progress";
export default function ProgressScreen() {
  const [userData, setUserData] = useState(null);
  const user = auth.currentUser;
  const currentNutritions = useSelector((state) => {
    return state.nutritions;
  });
  const totalNutrition = calculateTotalNutrition(currentNutritions);
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
    });
  }, []);

  if (userData) {
    const expectedProgress =
      Math.round(
        (totalNutrition.totalCalories - userData.calories) * 0.00013 * 100
      ) / 100;
    const expectedWeight = [];
    if (userData.weightByDay) {
      for (let i = 0; i <= userData.weightByDay.length; i++) {
        expectedWeight.push(userData.weightByDay[0] + 0.5 * i);
      }
    } else {
      expectedWeight.push(userData.weight);
      expectedWeight.push(
        userData.weight +
          (userData.goal === "Increase Weight"
            ? userData.change
            : -userData.change)
      );
    }
    const weekArr = userData.weightByDay
      ? userData.weightByDay.map((item, index) => {
          return `Week ${index + 1}`;
        })
      : [];
    weekArr.push(
      `Week ${userData.weightByDay ? userData.weightByDay.length + 1 : 1}`
    );
    weekArr.push(
      `Week ${userData.weightByDay ? userData.weightByDay.length + 2 : 2}`
    );
    console.log(expectedWeight);
    const weightData = {
      labels: weekArr,
      datasets: [
        {
          data: expectedWeight, // Expected weight data
          color: (opacity = 0.1) => `rgba(42, 250, 0, 0.6)`, // Expected weight line color
          strokeWidth: 2, // Line thickness
        },
        {
          data: userData.weightByDay ? userData.weightByDay : [userData.weight], // Actual weight data
          color: (opacity = 1) => `rgba(35, 134, 247, 1)`, // Actual weight line color
          strokeWidth: 2, // Line thickness
        },
      ],
    };
    return (
      <LinearGradient
        colors={["#99d8f7", "#edf1f2"]}
        style={styles.container}
        start={{ x: 0, y: 0.5 }} // Start from the left
        end={{ x: 1, y: 0.5 }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontFamily: "Montserrat",
            marginTop: 60,
            marginBottom: 30,
            fontSize: 18,
          }}
        >
          Your Progress:
        </Text>
        <LineChart
          data={weightData}
          width={374}
          height={200}
          yAxisLabel={"kg"}
          chartConfig={{
            backgroundColor: "white",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />

        <View style={styles.legendContainer}>
          <View style={styles.legend}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: "rgba(35, 134, 247, 1)" },
              ]}
            />
            <Text>Actual Weight</Text>
          </View>
          <View style={styles.legend}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: "rgba(42, 250, 0, 0.6)" },
              ]}
            />
            <Text>Expected Weight</Text>
          </View>
        </View>
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
            <Image source={require("../../assets/todo.png")} />
          </View>
          <Text
            style={{
              alignSelf: "center",
              marginBottom: 20,
              fontFamily: "Montserrat_light",
            }}
          >
            Expected Progress This Day: {expectedProgress} kg
          </Text>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },

  chartContainer: {
    marginVertical: 16,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 30,
  },
  legendColorBox: {
    width: 16,
    height: 16,
    marginRight: 8,
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
});
