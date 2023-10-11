import { StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { View } from "react-native";
import { Image } from "react-native";
export default function FoodDetail(props) {
  return (
    <View style={styles.foodContainer}>
      <View style={styles.foodCard}>
        <View style={styles.information}>
          <Image source="../../../assets/breakfast.png" />
          <View style={styles.informationText}>
            <Text>{props.food.name}</Text>
            <Text>{props.food.calories}</Text>
            <Text>
              {props.food.amount} phần {props.food.weight}
            </Text>
          </View>
        </View>
        <View style={styles.nutrients}>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Carbs</Text>
            <Progress.Bar
              progress={(props.food.carbs * 4) / props.food.calories}
              width={50}
              color="rgba(107, 210, 167, 1)"
            />
            <Text style={styles.amountText}>{props.food.carbs}g</Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Proteins</Text>
            <Progress.Bar
              progress={(props.food.proteins * 4) / props.food.calories}
              width={50}
              color="rgba(147, 202, 252, 1)"
            />
            <Text style={styles.amountText}>{props.food.proteins}g</Text>
          </View>
          <View style={styles.nutrient}>
            <Text style={styles.nutrientText}>Fats</Text>
            <Progress.Bar
              progress={(props.food.fats * 9) / props.food.calories}
              width={50}
              color="rgba(249, 187, 249, 1)"
            />
            <Text style={styles.amountText}>{props.food.fats}g</Text>
          </View>
        </View>
      </View>
      <View style={styles.ingredientCard}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
