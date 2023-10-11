import { View } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

export default function MealDeatail(props) {
  const currentCalories = props.mealsList.reduce((accumulator, meal) => {
    return accumulator + meal.calories;
  });
  const currentFats = props.mealsList.reduce((accumulator, meal) => {
    return accumulator + meal.fats;
  });
  const currentProteins = props.mealsList.reduce((accumulator, meal) => {
    return accumulator + meal.proteins;
  });
  return (
    <View style={styles.MealDeatailContainer}>
      <Text style={styles.MealHeader}>{props.name}</Text>
      <View style={styles.information}>
        <Text>
          <FontAwesome5 name="fire" size={18} color="rgba(175, 242, 66, 1)" />{" "}
          <Text style={{ fontWeight: "bold" }}>{currentCalories}</Text>
        </Text>
        <Text>
          <Feather name="edit" size={18} color="rgba(175, 242, 66, 1)" />{" "}
          {props.mealsList.length} món, nguyên liệu
        </Text>
      </View>
      <View style={styles.nutrients}>
        <View style={styles.nutrient}>
          <Text style={styles.nutrientText}>Carbs</Text>
          <Progress.Bar
            progress={props.meal.currentCarbs / props.meal.neededCarbs}
            width={50}
            color="rgba(107, 210, 167, 1)"
          />
          <Text style={styles.amountText}>{props.meal.currentCarbs}g</Text>
        </View>
        <View style={styles.nutrient}>
          <Text style={styles.nutrientText}>Proteins</Text>
          <Progress.Bar
            progress={props.meal.currentProteins / props.meal.neededProteins}
            width={50}
            color="rgba(147, 202, 252, 1)"
          />
          <Text style={styles.amountText}>{props.meal.currentProteins}g</Text>
        </View>
        <View style={styles.nutrient}>
          <Text style={styles.nutrientText}>Fats</Text>
          <Progress.Bar
            progress={props.meal.currentFats / props.meal.neededFats}
            width={50}
            color="rgba(249, 187, 249, 1)"
          />
          <Text style={styles.amountText}>{props.meal.currentFats}g</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
