import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import WaterCup from "../mainScreen/WaterCup";
import { useState } from "react";
import MealSummary from "./MealSummary";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { auth, db } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { calculateTotalNutrition } from "../../../store/utils";
export default function AllDay(props) {
  const user = auth.currentUser;
  const currentNutritions = useSelector((state) => {
    return state.nutritions;
  });
  const totalNutrients = calculateTotalNutrition(currentNutritions);
  const currentWater = useSelector((state) => state.water.currentWater);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getDoc(doc(db, "users", user.uid)).then((res) => {
      setUserData(res.data());
    });
  }, []);
  if (userData) {
    var currentCalories = totalNutrients.totalCalories;
    var fullCups = Math.trunc((currentWater / userData.water) * 8);
    const DrinkWater = () => {
      props.onDrink();
    };
    var currentCarbs = totalNutrients.totalCarbs;
    var neededCarbs = userData.carbs;
    var currentProteins = totalNutrients.totalProteins;
    var neededProteins = userData.proteins;
    var currentFats = totalNutrients.totalFats;
    var neededFats = userData.fats;
    var neededCalories = userData.calories;
    if (totalNutrients.totalCalories !== 0) {
      return (
        <View style={styles.allDayContainer}>
          <MealSummary
            meal={{
              header: "All Day",
              image: require("../../../assets/allDayBanner.png"),
              currentCalories,
              neededCalories,
              currentCarbs,
              neededCarbs,
              currentProteins,
              neededProteins,
              currentFats,
              neededFats,
              foodNum:
                currentNutritions.breakfast.foods.length +
                currentNutritions.dinner.foods.length +
                currentNutritions.lunch.foods.length +
                currentNutritions.snacks.foods.length,
            }}
            summary={true}
          />
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
              <Text style={{ fontFamily: "Montserrat" }}>Uống nước</Text>
              <Text style={{ fontFamily: "Montserrat_light" }}>
                Mục tiêu:{currentWater}/{userData.water}l
              </Text>
            </View>
            <WaterCup fullCups={fullCups} DrinkWater={DrinkWater} />
          </View>
          <MealSummary
            meal={{
              header: "Breakfast",
              image: require("../../../assets/breakfast.png"),
              currentCalories: currentNutritions.breakfast.totalCalories,
              neededCalories,
              currentCarbs: currentNutritions.breakfast.totalCarbs,
              neededCarbs,
              currentProteins: currentNutritions.breakfast.totalProteins,
              neededProteins,
              currentFats: currentNutritions.breakfast.totalFats,
              neededFats,
              foodNum: currentNutritions.breakfast.foods.length,
            }}
            summary={true}
          />
          <MealSummary
            meal={{
              header: "Lunch",
              image: require("../../../assets/lunch.png"),
              currentCalories: currentNutritions.lunch.totalCalories,
              neededCalories,
              currentCarbs: currentNutritions.lunch.totalCarbs,
              neededCarbs,
              currentProteins: currentNutritions.lunch.totalProteins,
              neededProteins,
              currentFats: currentNutritions.lunch.totalFats,
              neededFats,
              foodNum: currentNutritions.lunch.foods.length,
            }}
            summary={true}
          />
          <MealSummary
            meal={{
              header: "Dinner",
              image: require("../../../assets/dinner.png"),
              currentCalories: currentNutritions.dinner.totalCalories,
              neededCalories,
              currentCarbs: currentNutritions.dinner.totalCarbs,
              neededCarbs,
              currentProteins: currentNutritions.dinner.totalProteins,
              neededProteins,
              currentFats: currentNutritions.dinner.totalFats,
              neededFats,
              foodNum: currentNutritions.dinner.foods.length,
            }}
            summary={true}
          />
          <MealSummary
            meal={{
              header: "Snacks",
              image: require("../../../assets/snack.png"),
              currentCalories: currentNutritions.snacks.totalCalories,
              neededCalories,
              currentCarbs: currentNutritions.snacks.totalCarbs,
              neededCarbs,
              currentProteins: currentNutritions.snacks.totalProteins,
              neededProteins,
              currentFats: currentNutritions.snacks.totalFats,
              neededFats,
              foodNum: currentNutritions.snacks.foods.length,
            }}
            summary={true}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.heading}>Sorry.</Text>
          <Text style={styles.noPlanText}>
            You haven't made plans for today yet.
          </Text>
          <Text style={styles.noPlanText}>
            Let's create the best meals for today!
          </Text>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
          <Image source={require("../../../assets/grocery.png")} />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    zIndex: -1,
    marginTop: -20,
    paddingTop: 20,
  },
  addBtn: {
    backgroundColor: "rgba(217, 227, 249, 1)",
    alignSelf: "center",
    padding: 10,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 50,
    fontWeight: 600,
    paddingHorizontal: 12,
    textAlign: "center",
    color: "rgba(155, 183, 240, 1)",
  },
  heading: {
    alignSelf: "center",
    fontFamily: "Montserrat",
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
  noPlanText: {
    alignSelf: "center",
    fontSize: 15,
    fontFamily: "Montserrat_light",
    marginBottom: 10,
  },
  allDayContainer: {
    width: "85%",
    alignSelf: "center",
    paddingBottom: 100,
  },
  summary: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "rgba(29, 22, 23, 0.3)",
    borderRadius: 20,
  },
  summaryHeader: {
    fontFamily: "Montserrat",
    marginTop: 10,
    marginBottom: 10,
  },
  nutrients: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  nutrientText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    marginBottom: 3,
  },
  amountText: {
    fontFamily: "Montserrat_light",
    fontSize: 12,
    color: "rgba(177, 177, 177, 1)",
    marginTop: 3,
  },
  water: {
    backgroundColor: "#AFF242",
    width: "100%",
    alignSelf: "center",
    marginTop: 35,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 10,
    paddingBottom: 15,
  },
});
